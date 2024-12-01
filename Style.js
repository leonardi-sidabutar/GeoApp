import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
    // Color Pallete
    bg_yellow:{
        backgroundColor:'#F4CE14'
    },
    bg_black:{
        backgroundColor:'#45474B'
    },
    bg_green:{
        backgroundColor:'#379777'
    },
    bg_white:{
        backgroundColor:'#F5F7F8'
    },

    // Dashboard Home
    home_header:{
        padding:20,
        paddingBottom:100,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    home_header_text:{
        fontSize:18,
        fontWeight:500,
    },
    home_box:{
        marginTop:-100,
        padding:20,
        borderRadius:10,
        flexWrap:'wrap',
        flexDirection:'row',

        // Shadow
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
    home_box_item:{
        width: '50%',
        height:65
    },
    home_search:{
        width:'100%',
        paddingHorizontal:10,
        borderWidth:2,
        borderColor:'#379777',
        borderRadius:30,
        backgroundColor:'white',
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:20
    }
})

export default AppStyles;