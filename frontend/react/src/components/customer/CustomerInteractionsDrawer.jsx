import {
    Badge, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,
    DrawerHeader, DrawerOverlay, FormControl, FormLabel, Select, Stack,
    Text, Textarea, useDisclosure
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {addCustomerInteraction, getCustomerInteractions} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";

export default function CustomerInteractionsDrawer({customerId, customerName}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [items, setItems] = useState([]);
    const [type, setType] = useState("NOTE");
    const [notes, setNotes] = useState("");

    const load = () => getCustomerInteractions(customerId)
        .then(res => setItems(res.data))
        .catch(err => errorNotification(err.code, err.response?.data?.message || "Could not load history"));

    useEffect(() => { if (isOpen) load(); }, [isOpen]);

    const save = () => addCustomerInteraction(customerId, {type, notes})
        .then(() => {
            setNotes("");
            successNotification("Activity saved", `Added to ${customerName}'s history`);
            load();
        })
        .catch(err => errorNotification(err.code, err.response?.data?.message || "Could not save activity"));

    return <>
        <Button rounded="full" colorScheme="teal" variant="outline" onClick={onOpen}>History</Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>{customerName} — interaction history</DrawerHeader>
                <DrawerBody>
                    <Stack spacing={4} mb={8}>
                        <FormControl>
                            <FormLabel>Activity type</FormLabel>
                            <Select value={type} onChange={e => setType(e.target.value)}>
                                {['NOTE', 'CALL', 'EMAIL', 'MEETING', 'FOLLOW_UP'].map(value =>
                                    <option key={value} value={value}>{value.replace('_', ' ')}</option>)}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Notes</FormLabel>
                            <Textarea value={notes} onChange={e => setNotes(e.target.value)}
                                      placeholder="What happened and what comes next?"/>
                        </FormControl>
                        <Button colorScheme="teal" isDisabled={!notes.trim()} onClick={save}>Add activity</Button>
                    </Stack>
                    <Stack spacing={4}>
                        {items.length === 0 && <Text color="gray.500">No interactions recorded yet.</Text>}
                        {items.map(item => <Stack key={item.id} borderWidth="1px" rounded="md" p={3}>
                            <Badge width="fit-content" colorScheme="teal">{item.type.replace('_', ' ')}</Badge>
                            <Text>{item.notes}</Text>
                            <Text fontSize="xs" color="gray.500">
                                {new Date(item.createdAt).toLocaleString()} · {item.createdBy}
                            </Text>
                        </Stack>)}
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>;
}
