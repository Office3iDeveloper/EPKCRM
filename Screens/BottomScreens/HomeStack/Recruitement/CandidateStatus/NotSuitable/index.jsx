import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../Joined/style";
import ArrowRightIcon from "../../../../../../Assets/Icons/ArrowRight.svg";
import ArrowLeftIcon from "../../../../../../Assets/Icons/leftarrow.svg";


const NotSuitable = ({ employeeData, loading, filteredData, navigation }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={"#0A60F1"} style={styles.activityIndicator} />
                ) : (
                    <>
                        {paginatedData.length === 0 ? (
                            <Text style={styles.name1}>No Data found</Text>
                        ) : (
                            paginatedData.map((employee, index) => (
                                <View key={index} style={[styles.card]}>
                                    <View>

                                        <View style={styles.divider}>
                                            <View style={{ gap: 5 }}>
                                                <Text style={{ fontWeight: '600', fontSize: 20, color: '#3A3A3A' }}>{employee.candidate_name}</Text>
                                                <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.current_designation}</Text>
                                            </View>
                                            <View style={styles.ViewDetails1}>
                                                <Text style={styles.DetailsText1}>{employee.status}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.divider}>
                                            <Text style={{ fontWeight: '600', fontSize: 18, color: '#00275C' }}>CTC : <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.current_ctc}</Text></Text>
                                            <Text style={{ fontWeight: '600', fontSize: 18, color: '#00275C' }}>EXP : <Text style={{ fontWeight: '400', fontSize: 18 }}>{employee.total_exp}</Text></Text>
                                        </View>

                                        <View>
                                            <TouchableOpacity style={styles.ViewDetails} onPress={() => navigation.navigate('Candidate View Details', { Id: employee.id })}
                                            >
                                                <Text style={styles.DetailsText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                            ))
                        )}

                        {paginatedData.length === 0 ? null : <View style={{ alignItems: 'center' }}>
                            <View style={styles.pagination}>

                                <TouchableOpacity style={styles.prev}
                                    onPress={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ArrowLeftIcon width={14} height={14} color={'#737373'} />
                                    <Text style={styles.prevText}>
                                        Prev
                                    </Text>
                                </TouchableOpacity>

                                {pages.map((page, index) => (
                                    <View key={index} style={[currentPage === page ? styles.PageActive : null, { width: 26, height: 26, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }]}>
                                        <Text
                                            style={[styles.pageNo, currentPage === page ? styles.PageActive : null]}
                                            onPress={() => onPageChange(page)}
                                        >
                                            {page}
                                        </Text>
                                    </View>
                                ))}

                                <TouchableOpacity style={styles.Next}
                                    onPress={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <Text style={styles.NextText}>
                                        Next
                                    </Text>
                                    <ArrowRightIcon width={14} height={14} color={'#0A62F1'} />
                                </TouchableOpacity>

                            </View>
                        </View>}

                    </>
                )}
            </View>


        </ScrollView>
    );
};

export default NotSuitable;
