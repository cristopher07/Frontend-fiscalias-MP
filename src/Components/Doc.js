import React from "react";
import {
  Page,
  Text,
  Font,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

import logo from "../assets/logo.png";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 15,
    marginHorizontal: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Oswald",
    width: "300px"
  },
  paragraph: {
    fontSize: 16,
    margin: 12,
    fontFamily: "Oswald",
  },
  observaciones: {
    fontSize: 12,
    margin: 12,
    fontFamily: "Oswald",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Doc = ( {fiscalias} ) => {

  return (
    <Document>
      <Page style={styles.body}>
        <Image style={styles.image} src={logo} />
        
        {fiscalias ? 
           fiscalias.map((fiscalia, index) => {
           
            return (
            
              <View key={index}>
                <Text style={styles.title}>
                  -----------------------------------------------------------------
                </Text>
                <Text style={styles.subtitle}>Detalle de fiscalia</Text>
                  
                 <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>Agencia</Text>
                  <Text style={styles.text}>Código</Text>
                  <Text style={styles.text}>Tipo Fiscalía</Text>
                  <Text style={styles.text}>Departamento</Text>
                  <Text style={styles.text}>Municipio</Text>
                </View>
  
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>{fiscalia.agencia}</Text>
                  <Text style={styles.text}>{fiscalia.codigo}</Text>
                  <Text style={styles.text}>{fiscalia.tipo}</Text>
                  <Text style={styles.text}>{fiscalia.departamento}</Text>
                  <Text style={styles.text}>{fiscalia.municipio}</Text>
                </View>
              </View>
            );
          })
          
          :
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.observaciones}>No se encontró información</Text>
           
          </View>}
      </Page>
    </Document>
  );
};

export default Doc;