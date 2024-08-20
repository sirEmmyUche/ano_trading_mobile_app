
const baseUrl:string = 'https://67c9-105-112-213-217.ngrok-free.app'  
// const baseUrl:string = 'http://localhost:3000'; 

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
    const data = await fetch(`${baseUrl}/api/user/login`,{
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

export const googleOauth = async (response:any) => {
    const { credential } = response;
      const data = await fetch('${baseUrl}/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: credential }),
        credentials:'include',
      });
      const result = await data.json();
    //   console.log('googlelogin:',result)
      return result;
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
        console.error('Pricing:',error)
    }
}
export const initializePayment = async (paymentData:any)=>{
    const data = await fetch(`${baseUrl}/api/initialize/payment`,{
            method:'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(paymentData),
            credentials: 'include',
    });
    const result = await data.json();
    console.log('paymentData', result);
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
        console.error('pastSignals:',error)
    }
}

export const getForexSignals = async(page: number, filterStatus: string = 'all') => {
    try {
        const res = await fetch(`${baseUrl}/api/forex/signals?page=${page}&filterStatus=${filterStatus}`, {
            credentials: 'include',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('forexSignals:', error);
    }
}


export const getCryptoSignals = async(page:number)=>{
    try{
        const res = await fetch(`${baseUrl}/api/crypto/signals?page=${page}`,{
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        console.error('cryptoSignals:',error)
    }
}

export const getStockSignals = async(page:number)=>{
    try{
        const res = await fetch(`${baseUrl}/api/stock/signals?page=${page}`,{
            credentials: 'include',
    })
        const data = await res.json();
        return data;

    }catch(error){
        console.error('stockSignals:',error)
    }
}