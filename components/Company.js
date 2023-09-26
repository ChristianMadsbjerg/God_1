import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

function Company() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        generateCompanies();
    }, []);

    async function generateCompanies() {
        try {
            // Liste over tilgængelige FontAwesome-ikoner.
            const fontAwesomeIcons = [
                'briefcase',
                'building',
                'industry',
                'money',
                'shopping-cart',
                'users',
                'globe',
                'rocket',
                'puzzle-piece',
                'desktop',
            ];

            // Antal virksomheder du vil generere (her er det 10).
            const numberOfCompanies = 10;
            const generatedCompanies = [];

            for (let i = 0; i < numberOfCompanies; i++) {
                const randomIcon = fontAwesomeIcons[Math.floor(Math.random() * fontAwesomeIcons.length)];
                const companyName = `Company ${i + 1}`;
                const missingConsultants = Math.floor(Math.random() * 10) + 1;
                const topic = generateRandomTopic();
                const description = generateRandomDescription();

                generatedCompanies.push({
                    name: companyName,
                    icon: randomIcon,
                    missingConsultants: missingConsultants,
                    topic: topic,
                    description: description,
                });
            }

            setCompanies(generatedCompanies);
            setLoading(false);
        } catch (error) {
            console.error("Der opstod en fejl under hentning af virksomheder:", error);
            setLoading(false);
        }
    }

    // Funktion til at generere et tilfældigt emne (eksempel).
    function generateRandomTopic() {
        const topics = ["IT-konsulenter", "Marketing", "Finans", "Healthcare", "Retail", "Transportation"];
        const randomIndex = Math.floor(Math.random() * topics.length);
        return topics[randomIndex];
    }

    // Funktion til at generere en tilfældig beskrivelse (eksempel).
    function generateRandomDescription() {
        const descriptions = [
            "Vi mangler erfarne frontend-udviklere til at forbedre vores webapplikation.",
            "Vores marketingafdeling søger efter talenter til at forbedre vores online synlighed.",
            "Vi har brug for finansielle eksperter til at optimere vores økonomiske strategier.",
            "Søg efter konsulenter med sundhedsplejeerfaring til at hjælpe med at drive vores klinik.",
            "Vores butik har brug for erfarne detailkonsulenter til at forbedre kundeservice.",
        ];
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    }

    const toggleModal = (company) => {
        setSelectedCompany(company);
    };

    const closeModal = () => {
        setSelectedCompany(null);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Henter virksomheder...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Virksomheder uden konsulenter</Text>
            <FlatList
                data={companies}
                renderItem={({ item }) => (
                    <View style={styles.companyCard}>
                        {/* Brug FontAwesomeIcon til at vise ikonet */}
                        <FontAwesomeIcon name={item.icon} size={40} color="#4F8EF7" style={styles.companyIcon} />
                        <Text style={styles.companyName}>{item.name}</Text>
                        <Text>Emne: {item.topic}</Text>
                        <Text>Mangler {item.missingConsultants} konsulenter</Text>
                        <TouchableOpacity onPress={() => toggleModal(item)}>
                            <Text style={styles.viewMoreButton}>Vis mere</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
            />

            {/* Modal for visning af beskrivelse */}
            <Modal isVisible={selectedCompany !== null}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Beskrivelse af {selectedCompany?.name}</Text>
                    <Text style={styles.modalDescription}>{selectedCompany?.description}</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.closeButton}>Luk</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    companyCard: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
    },
    companyIcon: {
        alignSelf: 'center',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewMoreButton: {
        color: '#4F8EF7',
        textAlign: 'center',
        marginTop: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    }, // Tilføj den manglende }
    closeButton: {
        fontSize: 18,
        color: '#4F8EF7',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Company;
