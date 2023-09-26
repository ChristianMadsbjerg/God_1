import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, Button, ActivityIndicator } from 'react-native';

function Consultant() {
    const [consultants, setConsultants] = useState([]);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netværksfejl ved hentning af data');
                }
                return response.json();
            })
            .then(data => {
                const enhancedData = data.map(consultant => ({
                    ...consultant,
                    experience: Math.floor(Math.random() * 20) + 1,
                    specialty: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Database'][Math.floor(Math.random() * 5)],
                    image: `https://randomuser.me/api/portraits/${consultant.gender === 'male' ? 'men' : 'women'}/${consultant.id}.jpg`
                }));
                setConsultants(enhancedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Der opstod en fejl under hentning af konsulenter:", error);
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Konsulenter</Text>
            <TextInput style={styles.searchInput} placeholder="Søg konsulent..." />
            <FlatList
                data={consultants}
                renderItem={({ item }) => (
                    <View style={styles.consultantCard}>
                        <Image source={{ uri: item.image }} style={styles.consultantImage} />
                        <View style={styles.consultantInfo}>
                            <Text style={styles.consultantName}>{item.name}</Text>
                            <Text style={styles.consultantTitle}>{item.title}</Text>
                            <Text style={styles.consultantDescription}>{item.description}</Text>
                            <Button title="Se detaljer" onPress={() => setSelectedConsultant(item)} />
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            {selectedConsultant && (
                <View style={styles.detailContainer}>
                    <Text style={styles.detailHeader}>Detaljer for {selectedConsultant.name}</Text>
                    <Text>Erfaring: {selectedConsultant.experience} år</Text>
                    <Text>Speciale: {selectedConsultant.specialty}</Text>
                    <Button title="Luk" onPress={() => setSelectedConsultant(null)} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    consultantCard: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
    },
    consultantImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    consultantInfo: {
        flex: 1,
    },
    consultantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    consultantTitle: {
        color: '#777',
        marginBottom: 10,
    },
    consultantDescription: {
        marginBottom: 10,
    },
    detailContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 1,
    },
    detailHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default Consultant;