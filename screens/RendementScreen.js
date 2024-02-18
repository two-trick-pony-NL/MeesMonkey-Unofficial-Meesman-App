import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from "react-native";
import WaardeOntwikkeling from "../components/WaardeOntwikkelingPerJaar";
import NumberCard from "../components/NumberCard";
import NumbercardGradient from "../components/NumberCardGradient";
import SectionHeaderText from "../components/SectionHeaderText";
import HistoricDataChart from "../components/HistoricDataChart";
import SubheadingWithDescription from "../components/SubheadingWithDescription";

const RendementScreen = ({ data, graphdata, onBackToPortfolio }) => {
  const calculateColumnTotal = (columnIndex) => {
    let total = 0;
    for (const yearData of data.waardeontwikkeling) {
      const value = yearData.data[columnIndex][1].replace(/[^0-9.-]+/g, "");
      total += parseFloat(value) || 0;
    }
    return total;
  };

  const ongerealiseerdResultaatSum = data.resultaten.reduce((sum, item) => {
    const amountString = item.ongerealiseerd_resultaat;
    const amountInt = parseInt(amountString.replace(/[^\d-]/g, ""), 10) || 0;

    return sum + amountInt;
  }, 0);

  const totalOngerealiseerdResultaat = ongerealiseerdResultaatSum / 100;
  const totalFondskosten = calculateColumnTotal(6);
  const totalTransactiekosten = calculateColumnTotal(7);
  const totalReturnString = data.waardeontwikkeling[0].data[5][1];
  const totalReturnFloat =
    parseFloat(totalReturnString.replace(",", "").replace("%", ".")) / 10;
  const totalReturnWithTwoDecimal = (1 + totalReturnFloat / 100).toFixed(2);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <SectionHeaderText text={"Rendementen"} />
        <SubheadingWithDescription
          subheading={"Jouw geld aan het werk"}
          description={
            "Met een gemiddeld rendement van 7% kun je er op rekenen dat die €1 in ongeveer 10 jaar verdubbelt!"
          }
        />
        <NumbercardGradient
          explainerText={"Elke €1 die jij investeerde is nu waard"}
          bigNumber={"€ " + totalReturnWithTwoDecimal}
        />
        <SubheadingWithDescription
          subheading={"Totaal rendement"}
          description={
            "Dit is wat jouw beleggingen hebben opgeleverd sinds je begonnen bent met beleggen."
          }
        />

        <View style={styles.numberCardsRow}>
          <View style={styles.numberCardSmall}>
            <NumberCard
              explainerText={"In procenten"}
              bigNumber={totalReturnString}
            />
          </View>

          <View style={styles.numberCardLarge}>
            <NumberCard
              explainerText={"In Euro"}
              bigNumber={"€ " + totalOngerealiseerdResultaat}
            />
          </View>
        </View>

        <SubheadingWithDescription
          subheading={"Kosten"}
          description={
            "Beleggen brengt kosten met zich mee. Dit is het totaal aan kosten sinds het openen van jouw rekening."
          }
        />
        <View style={styles.numberCardsRow}>
          <View style={styles.numberCardSmall}>
            <NumberCard
              explainerText={"Fondskosten"}
              bigNumber={"€ " + totalFondskosten}
            />
          </View>

          <View style={styles.numberCardSmall}>
            <NumberCard
              explainerText={"Transactiekosten"}
              bigNumber={"€ " + totalTransactiekosten}
            />
          </View>
        </View>

        <SubheadingWithDescription
          subheading={"Jaaroverzichten"}
          description={"Klik op een jaar voor een volledig overzicht"}
        />
        <WaardeOntwikkeling data={data.waardeontwikkeling} />
      </SafeAreaView>
      <View style={{ height: 200 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  numberCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberCardLarge: {
    flex: 3,
  },
  numberCardSmall: {
    flex: 2,
  },
});

export default RendementScreen;
