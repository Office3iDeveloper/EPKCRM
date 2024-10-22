import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Linking, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from '../../../../../Assets/Icons/Search.svg';
import DeleteIcon from "../../../../../Assets/Icons/Delete.svg";
import MailOpenIcon from "../../../../../Assets/Icons/mailOpen.svg";
import MailCloseIcon from "../../../../../Assets/Icons/mailClosed.svg";
import ArrowRightIcon from "../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../Assets/Icons/leftarrow.svg";
import ViewIcon from "../../../../../Assets/Icons/eyeopen.svg";
import styles from "./style";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import LottieAlertSucess from "../../../../../Assets/Alerts/Success";
import LottieAlertError from "../../../../../Assets/Alerts/Error";
import LottieCatchError from "../../../../../Assets/Alerts/Catch";


const InboxResume = () => {

    // data from redux store 

    const { data } = useSelector((state) => state.login);

    const [loadData, setLoadData] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [readCount, setReadCount] = useState();
    const [unReadCount, setUnReadCount] = useState();

    const itemsPerPage = 5;

    const [filterText, setFilterText] = useState('');

    const filteredData = datalist ? datalist.filter(row => {
        const values = Object.values(row).map(value => String(value));
        return values.some(value =>
            value.toLowerCase().includes(filterText.toLowerCase()));
    }) : [];

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const renderPagination = () => {
        const pagination = [];
        const showEllipsis = totalPages > 5;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else {
            pagination.push(1);
            if (currentPage > 3) {
                pagination.push('...');
            }
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pagination.push(i);
            }
            if (currentPage < totalPages - 2) {
                pagination.push('...');
            }
            pagination.push(totalPages); // Always show the last page
        }

        return pagination.map((page, index) => (
            typeof page === 'number' ? (
                <Text
                    key={index}
                    style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                    onPress={() => onPageChange(page)}
                >
                    {page}
                </Text>
            ) : (
                <Text key={index} style={styles.pageNo}>...</Text>
            )
        ));
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 

    const fetchData = async () => {
        setLoadData(true)
        try {
            const apiUrl = 'https://office3i.com/development/api/public/api/career_inboxdetails';
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });
            setLoadData(false)
            const responseData = response.data;
            setDatalist(responseData.data.career_list);
            setReadCount(responseData.data.read_count);
            setUnReadCount(responseData.data.unread_count);
        } catch (error) {
            setLoadData(false)
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    // 

    const handlePreview = (UrlLink) => {
        const baseUrl = 'https://office3i.com/development/api/storage/app/';
        const filePath = UrlLink;
        const url = `${baseUrl}${filePath}`;
        if (filePath && filePath !== "-") {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        } else {
            Alert.alert('No File Located')
        }
    }

    // 

    const [DelData, setDelData] = useState(false);
    const [Reason, setReason] = useState('');
    const [slotToDelete, setSlotToDelete] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [ReasonError, setReasonError] = useState('');

    const confirmDelete = async () => {

        setDelData(true)

        try {

            if (!Reason) {
                setReasonError('Reason Required');
                setDelData(false);
                return;
            } else {
                setReasonError('');
                setReason('');
            }

            const apiUrl = `https://office3i.com/development/api/public/api/single_delete`;

            const response = await axios.post(apiUrl, {
                id: slotToDelete,
                updated_by: data.userempid,
                reason: Reason,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const ResData = response.data

            if (ResData.status === "success") {
                const updatedDataList = datalist.filter(slot => slot.id !== slotToDelete);
                setDatalist(updatedDataList);
                setModalVisible(false);
                setDelData(false);
                setReasonError('');
                setReason('');
                handleShowAlert(ResData.message);
            } else {
                handleShowAlert1(ResData.message);
                setModalVisible(false);
                setDelData(false);
                setReasonError('');
                setReason('');
            }

        } catch (error) {
            handleShowAlert2();
            setDelData(false);
        }
    }

    const HandleDelete = (Id) => {
        setSlotToDelete(Id);
        setModalVisible(true);
    }

    const cancelDelete = () => {
        setSlotToDelete(null);
        setModalVisible(false);
        setReasonError('');
        setReason('');
    }

    // 

    const [selectedIds, setSelectedIds] = useState([]);
    // 

    const hasReadItems = paginatedData.some(item => item.read_status == 1);
    const hasUnreadItems = paginatedData.some(item => item.read_status == 0);
    const [selectedOption, setSelectedOption] = useState('None');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const options = ['All', 'Read', 'Unread', 'None'];
    console.log(selectedIds, "selectedIds");

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
        switch (option) {
            case 'All':
                setSelectedIds(datalist.map(item => item.id));
                break;
            case 'Read':
                setSelectedIds(datalist.filter(item => item.read_status == 1).map(item => item.id));
                break;
            case 'Unread':
                setSelectedIds(datalist.filter(item => item.read_status == 0).map(item => item.id));
                break;
            case 'None':
                setSelectedIds([]);
                break;
            default:
                break;
        }
        setDropdownVisible(false);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const [DelData1, setDelData1] = useState(false);
    const [Reason1, setReason1] = useState('');
    const [modalVisible1, setModalVisible1] = useState(false);
    const [ReasonError1, setReasonError1] = useState('');

    const confirmDelete1 = async () => {

        setDelData1(true)

        try {

            if (!Reason1) {
                setReasonError1('Reason Required');
                setDelData1(false);
                return;
            } else {
                setReasonError1('');
                setReason1('');
            }

            const apiUrl = `https://office3i.com/development/api/public/api/bulk_delete`;

            const response = await axios.post(apiUrl, {
                id: selectedIds.join(', '),
                updated_by: data.userempid,
                reason: Reason1,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            const ResData = response.data

            if (ResData.status === "success") {
                fetchData();
                handleShowAlert(ResData.message);
                setModalVisible1(false);
                setDelData1(false);
                setReasonError1('');
                setReason1('');
                setSelectedIds([]);
            } else {
                handleShowAlert1(ResData.message);
                setModalVisible1(false);
                setDelData1(false);
                setReasonError1('');
                setReason1('');
            }

        } catch (error) {
            handleShowAlert2();
            setDelData1(false);
        }
    }

    const HandleDelete1 = () => {
        setModalVisible1(true);
    }

    const cancelDelete1 = () => {
        setModalVisible1(false);
        setReasonError1('');
        setReason1('');
    }

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [resMessage, setResMessage] = useState('');

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setResMessage(res)
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);
    const [resMessageFail, setResMessageFail] = useState('');

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setResMessageFail(res);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

    // 

    const ReadMail = async (id) => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/read_countupdate`;

            const response = await axios.post(apiUrl, {
                id: id,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data.message);
                fetchData();
            } else {
                handleShowAlert1(response.data.message);
            }
        } catch (error) {
            handleShowAlert2();
        }
    }

    const BulkReadMail = async (id) => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/bulk_read_countupdate`;

            const response = await axios.post(apiUrl, {
                id: selectedIds.join(', '),
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data.message);
                setSelectedIds([]);
                fetchData();
            } else {
                handleShowAlert1(response.data.message);
            }
        } catch (error) {
            handleShowAlert2();
        }
    }

    const UnReadMail = async (id) => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/un_read_countupdate`;

            const response = await axios.post(apiUrl, {
                id: id,
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data.message);
                fetchData();
            } else {
                handleShowAlert1(response.data.message);
            }
        } catch (error) {
            handleShowAlert2();
        }
    }

    const BulkUnReadMail = async (id) => {

        try {

            const apiUrl = `https://office3i.com/development/api/public/api/bulk_unread_countupdate`;

            const response = await axios.post(apiUrl, {
                id: selectedIds.join(', '),
                updated_by: data.userempid,
            }, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            });

            if (response.data.status === "success") {
                handleShowAlert(response.data.message);
                setSelectedIds([])
                fetchData();
            } else {
                handleShowAlert1(response.data.message);
            }
        } catch (error) {
            handleShowAlert2();
        }
    }

    return (

        <ScrollView>

            <View style={styles.Page}>

                <View style={styles.filterInput}>

                    <TextInput
                        style={styles.search}
                        placeholder="Search"
                        value={filterText}
                        onChangeText={text => {
                            setFilterText(text);
                            setCurrentPage(1);
                        }}
                    />

                    <View style={styles.searchIcon}>
                        <SearchIcon color={"#1AD0FF"} />
                    </View>

                </View>

                <View style={styles.ButtonView}>
                    <TouchableOpacity style={styles.Button}>

                        <Text style={styles.ButtonText}>
                            Read  <View style={styles.ButtonCount}>
                                <Text style={styles.ButtonCountText}>{readCount}</Text>
                            </View>
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button}>

                        <Text style={styles.ButtonText}>
                            Unread <View style={styles.ButtonCount}>
                                <Text style={styles.ButtonCountText}>{unReadCount}</Text>
                            </View>
                        </Text>

                    </TouchableOpacity>

                </View>

                {selectedOption === "All" || selectedOption === 'Read' && hasReadItems || selectedOption === 'Unread' && hasUnreadItems ? <View style={styles.ButtonView1}>

                    {selectedOption === 'Read' && hasReadItems || selectedOption === "All" ? <TouchableOpacity style={styles.Button1} onPress={() => BulkUnReadMail()}>
                        <MailCloseIcon width={18} height={18} />
                        <Text style={styles.ButtonText1}>
                            Mark as unread
                        </Text>
                    </TouchableOpacity> : null}

                    {selectedOption === 'Unread' && hasUnreadItems || selectedOption === "All" ? <TouchableOpacity style={styles.Button1} onPress={() => BulkReadMail()}>
                        <MailOpenIcon width={18} height={18} />
                        <Text style={styles.ButtonText1}>
                            Mark as read
                        </Text>
                    </TouchableOpacity> : null}

                    <TouchableOpacity style={styles.Button2} onPress={() => HandleDelete1()}>
                        <DeleteIcon width={14} height={14} color={"#BD0000"} />
                        <Text style={styles.ButtonText2}>
                            Delete
                        </Text>
                    </TouchableOpacity>

                </View> : null}

                <ScrollView horizontal={true}>

                    <View style={styles.Tablecontainer}>
                        {loadData ? (
                            <ActivityIndicator size="small" color="#20DDFE" style={styles.Activeindicator} />
                        ) : (
                            <View>

                                <View style={[styles.row, styles.listHeader]}>
                                    <View style={[styles.cell, styles.sno, { alignItems: 'center' }]}>
                                        <CheckBox
                                            value={selectedOption === 'All' || selectedOption === 'Read' && hasReadItems || selectedOption === 'Unread' && hasUnreadItems ? true : false}
                                            onChange={() => setDropdownVisible(true)}
                                            tintColors={{ true: '#20DDFE' }}
                                            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginRight: 10 }}
                                        />
                                        <Text>{selectedOption}</Text>
                                    </View>
                                    <Text style={[styles.header, styles.cell, styles.DepartmentName]}>Designation</Text>
                                    <Text style={[styles.header, styles.cell, styles.EmployeeName]}>Name</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Mobile No</Text>
                                    <Text style={[styles.header, styles.cell, styles.EndDate]}>Email</Text>
                                    <Text style={[styles.header, styles.cell, styles.StartDate]}>Key Skills</Text>
                                    <Text style={[styles.header, styles.cell, styles.Resume]}>Resume</Text>
                                    <Text style={[styles.header, styles.cell, styles.Action]}>Action</Text>
                                </View>

                                {paginatedData.length === 0 ? (
                                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No data available</Text>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <View key={index} style={[styles.row, styles.listBody]}>
                                            <View style={[styles.cell, styles.sno, { alignItems: 'center' }]}>
                                                <CheckBox
                                                    value={selectedIds.includes(item.id)}
                                                    onValueChange={() => handleCheckboxChange(item.id)}
                                                    tintColors={{ true: '#20DDFE' }}
                                                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginRight: 10 }}
                                                />
                                            </View>
                                            <Text style={[styles.cell, styles.DepartmentName]}>{item.designation}</Text>
                                            <Text style={[styles.cell, styles.EmployeeName]}>{item.candidate_name}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.mobile_no}</Text>
                                            <Text style={[styles.cell, styles.EndDate]}>{item.email}</Text>
                                            <Text style={[styles.cell, styles.StartDate]}>{item.key_skills}</Text>

                                            <View style={styles.listcontentButtonview}>
                                                <TouchableOpacity
                                                    onPress={() => handlePreview(item.attachment)}
                                                    style={styles.listcontentviewbutton}>
                                                    <ViewIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.listcontentButtonview}>
                                                {
                                                    item.read_status == 0 ?
                                                        <TouchableOpacity
                                                            onPress={() => ReadMail(item.id)}
                                                            style={styles.listcontentmailbutton}>
                                                            <MailCloseIcon width={18} height={18} />
                                                        </TouchableOpacity> :
                                                        <TouchableOpacity
                                                            onPress={() => UnReadMail(item.id)}
                                                            style={styles.listcontentmailbutton}>
                                                            <MailOpenIcon width={18} height={18} />
                                                        </TouchableOpacity>
                                                }
                                                <TouchableOpacity
                                                    onPress={() => HandleDelete(item.id)}
                                                    style={styles.listcontentdelbutton}>
                                                    <DeleteIcon width={14} height={14} color={"#000"} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    ))
                                )}

                            </View>
                        )
                        }
                    </View>

                </ScrollView>

                <View style={{ alignItems: 'center' }}>
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            style={styles.prev}
                            onPress={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                            <Text style={styles.prevText}>Prev</Text>
                        </TouchableOpacity>
                        {renderPagination()}
                        <TouchableOpacity
                            style={styles.Next}
                            onPress={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.NextText}>Next</Text>
                            <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../../../Assets/Alerts/tick.json')}
                title={resMessage}
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../../../Assets/Alerts/Close.json')}
                title={resMessageFail}
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data"
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete This !</Text>
                        <Text style={styles.modalText}>Reason:</Text>
                        <TextInput
                            value={Reason}
                            onChangeText={(text) => setReason(text)}
                            style={styles.Reason}
                        />
                        <Text style={styles.errorTextDelete}>
                            {ReasonError}
                        </Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete}>
                                <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete}>


                                {
                                    DelData ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                }


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTextHeading}>Are You Sure You Want To Delete All This !</Text>
                        <Text style={styles.modalText}>Reason:</Text>
                        <TextInput
                            value={Reason1}
                            onChangeText={(text) => setReason1(text)}
                            style={styles.Reason}
                        />
                        <Text style={styles.errorTextDelete}>
                            {ReasonError1}
                        </Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCancelButton1} onPress={cancelDelete1}>
                                <Text style={styles.modalCancelButtonText1}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmDelete1}>


                                {
                                    DelData1 ?
                                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                                        <Text style={styles.modalDeleteButtonText}>Delete</Text>
                                }


                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={dropdownVisible}
                animationType="slide"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalTextHeading1}
                                    onPress={() => handleOptionSelect(item)}
                                >
                                    <Text style={styles.modalText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

        </ScrollView>

    )

}

export default InboxResume;