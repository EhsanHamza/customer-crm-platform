import {
    Wrap,
    WrapItem,
    Spinner,
    Text, Input, Select, HStack, Button, Badge, Stack
} from '@chakra-ui/react';
import SidebarWithHeader from "./components/shared/SideBar.jsx";
import { useEffect, useState } from 'react';
import { getCustomers } from "./services/client.js";
import CardWithImage from "./components/customer/CustomerCard.jsx";
import CreateCustomerDrawer from "./components/customer/CreateCustomerDrawer.jsx";
import {errorNotification} from "./services/notification.js";

const Customer = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState("");
    const [query, setQuery] = useState("");
    const [gender, setGender] = useState("");
    const [sort, setSort] = useState("name");
    const [page, setPage] = useState(0);
    const [pageInfo, setPageInfo] = useState({totalElements: 0, totalPages: 0});

    const fetchCustomers = () => {
        setLoading(true);
        getCustomers({query, gender: gender || undefined, sort, page, size: 6}).then(res => {
            setCustomers(res.data.content)
            setPageInfo(res.data)
        }).catch(err => {
            setError(err.response.data.message)
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCustomers();
    }, [query, gender, sort, page])

    if (loading) {
        return (
            <SidebarWithHeader>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </SidebarWithHeader>
        )
    }

    if (err) {
        return (
            <SidebarWithHeader>
                <CreateCustomerDrawer
                    fetchCustomers={fetchCustomers}
                />
                <Text mt={5}>Ooops there was an error</Text>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <Stack mb={6} spacing={4}>
                <HStack flexWrap="wrap">
                    <Input maxW="360px" placeholder="Search by name or email"
                           value={query} onChange={e => {setQuery(e.target.value); setPage(0)}}/>
                    <Select maxW="180px" value={gender}
                            onChange={e => {setGender(e.target.value); setPage(0)}}>
                        <option value="">All genders</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </Select>
                    <Select maxW="180px" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="name">Sort by name</option>
                        <option value="email">Sort by email</option>
                        <option value="age">Sort by age</option>
                    </Select>
                    <Badge p={2}>{pageInfo.totalElements} customers</Badge>
                </HStack>
            </Stack>
            <CreateCustomerDrawer
                fetchCustomers={fetchCustomers}
            />
            {customers.length === 0 && <Text my={8} textAlign="center">No customers match these filters.</Text>}
            <Wrap justify={"center"} spacing={"30px"}>
                {customers.map((customer, index) => (
                    <WrapItem key={index}>
                        <CardWithImage
                            {...customer}
                            imageNumber={index}
                            fetchCustomers={fetchCustomers}
                        />
                    </WrapItem>
                ))}
            </Wrap>
            <HStack justify="center" mt={6}>
                <Button isDisabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Text>Page {page + 1} of {Math.max(pageInfo.totalPages, 1)}</Text>
                <Button isDisabled={page + 1 >= pageInfo.totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </HStack>
        </SidebarWithHeader>
    )
}

export default Customer;
