export const baseUrl:string = 'https://anotrade-server.onrender.com'; 
// export const baseUrl:string = 'https://93b8-105-112-221-169.ngrok-free.app'; 
// export const baseUrl:string = 'http://localhost:3000'; 

//If you change the baseUrl here, always change it at userAvi.tsx for file upload

export const signUp = async (formData:any): Promise<any>=>{
    const data = await fetch(`${baseUrl}/api/user/register`,{
            method:'post',
            headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(formData),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('signup', result);
    return result;
}

export const logIn = async (formData:{email:string,password:string}): Promise<any>=>{
    const data = await fetch(`${baseUrl}/api/user/mobile/login`,{
            method:'post',
            headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(formData),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('logIn', result);
    return result;
}

export const googleOauth = async (token:any) => {
    try{
      const data = await fetch(`${baseUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({idToken:token}),
        credentials:'include',
      });
      const result = await data.json();
    //   console.log('googlelogin:',result)
      return result;
    }catch(error){
        console.error('google auth:', error)
    }
  };

export const logOut = async ()=>{
    const data = await fetch(`${baseUrl}/api/user/logout`,{
            method:'post',
            credentials: 'include',
    })
    const result = await data.json();
    return result;
}

export const forgotPassword = async (formData:{email:string}):Promise<any>=>{
    const data = await fetch(`${baseUrl}/api/password/forget`,{
            method:'post',
            headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(formData),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('logIn', result);
    return result;
}

export const pricingAPI = async()=>{
    try{
        const res = await fetch(`${baseUrl}/api/signal/price`,{
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        // console.error('Pricing:',error)
    }
}
export const initializePayment = async (paymentData:any,token:string|undefined)=>{
    const data = await fetch(`${baseUrl}/api/initialize/payment`,{
            method:'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('paymentData', result);
    return result;
}

export const getPastSignals = async()=>{
    try{
        const res = await fetch(`${baseUrl}/api/past/signals/mobile`,{
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        // console.error('pastSignals:',error)
    }
}

export const getForexSignals = async(page:number,token:string|undefined,status:string) => {
    try {
        const res = await fetch(`${baseUrl}/api/forex/signals?page=${page}&status=${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        // console.error('forexSignals:', error);
    }
}


export const getCryptoSignals = async(page:number,token:string|undefined,status:string)=>{
    try{
        const res = await fetch(`${baseUrl}/api/crypto/signals?page=${page}&status=${status}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        // console.error('cryptoSignals:',error)
    }
}

export const getStockSignals = async(page:number, token:string|undefined,status:string)=>{
    try{
        const res = await fetch(`${baseUrl}/api/stock/signals?page=${page}&status=${status}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        // console.error('stockSignals:',error)
    }
}

export const fetchYearlyData = async(token:string|undefined)=>{
    try{
        const res = await fetch(`${baseUrl}/api/total/signals/per/month`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        console.error('fetchYearlyData:',error)
    }
}


export const deleteAvi = async(id:string)=>{
    try{
        const res = await fetch(`${baseUrl}/api/user/avi/delete?id=${id}`,{
            method:'delete'
        });
        const data = await res.json();
        return data;
    }catch(error){
        // console.error('deleteAvi error:',error)
        return error;
    }
}

export const sendPushNotificationTokenToServer = async(pushToken:string,token:string|undefined)=>{
    try{
        const data = await fetch(`${baseUrl}/api/store/pushtoken`,{
            method:'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({pushToken}),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('token:', result);
    return result;
    }catch(error){
        return error
    }
}

export const apiJoinMeeting = async (token:string|undefined)=>{
    const data = await fetch(`${baseUrl}/api/join/live/meeting`,{
            method:'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(paymentData),
            credentials: 'include',
    });
    const result = await data.json();
    // console.log('paymentData', result);
    return result;
}