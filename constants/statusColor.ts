import { StyleSheet } from "react-native";

export const statusColor = (status:string)=>{
    switch(status){
        case 'completed': return [styles.completed, styles.border];
        break;
        case 'active': return [styles.active, styles.border];
        break
        case 'pending':return [styles.pending, styles.border];
        break
        case 'deleted':return [styles.deleted, styles.border];
        break
        case 'closed': return [styles.closed, styles.border];
        default: return 'default'
    }
}

const styles = StyleSheet.create({
    border:{
        borderWidth:1
    },
    pending:{
        backgroundColor:'#28ce30',
        borderColor:'#28ce30',
    },
    completed:{
        borderColor:'gray',
        backgroundColor:'gray'
    },
    active:{
        borderColor:'orange',
        backgroundColor:'orange'
    },
    closed:{
        borderColor:'pink',
        backgroundColor:'pink'
    },
    deleted:{
        borderColor:'red',
        backgroundColor:'red'
    }
})
