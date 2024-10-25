import { StyleSheet } from "react-native";

export const statusColor = (status:string)=>{
    switch(status){
        case 'completed': return [styles.completed,];
        break;
        case 'active': return [styles.active,];
        break
        case 'pending':return [styles.pending,];
        break
        case 'deleted':return [styles.deleted,];
        break
        case 'closed': return [styles.closed,];
        default: return 'default'
    }
}

const styles = StyleSheet.create({
    // border:{
    //     borderWidth:1
    // },
    pending:{
        borderColor:'#34c759',
        backgroundColor:'#34c759',
        fontWeight:'bold',
    },
    completed:{
        borderColor:'#4682b4',
        backgroundColor:'#4682b4',
        fontWeight:'bold',
    },
    active:{
        backgroundColor:'#b58c10',
        borderColor:'#b58c10',
        fontWeight:'bold',
    },
    closed:{
        borderColor:'#6c757d',
        backgroundColor:'#6c757d',
        fontWeight:'bold',
    },
    deleted:{
        borderColor:'#e74c3c',
        backgroundColor:'#e74c3c',
        fontWeight:'bold',
    }
})
