import React, { useState, useEffect } from "react"
import Basic from "./Components/Basic"

function Stock() {
    const [token, setToken] = useState('');
    const [inventory, setInventory] = useState([])
    const [page, setPage] = useState(1); 
    const [search, setSearch] = useState('')
    const [hasMore,setHasMore] = useState(true)
   
    useEffect(() => {
        const storedToken= localStorage.getItem(token)
        console.log("this is storedtoken:",storedToken)
        if(!storedToken){
            fetchData()
        }
        else{
            setToken(storedToken)
        }
    },[])

    useEffect(() => {  
        if (token && hasMore) {           
            const pageSize = 10; 
            const offset = (page-1) * pageSize;
            const inventoryApiUrl = `https://eaf-dms-api.yecor.com/api/inventory/product-SKUs/?warehouse_id=22&ordering=name&search=${search}&limit=${pageSize}&offset=${offset}&remove_product_stocking=true`
           fetchInventoryData(inventoryApiUrl, token, setInventory, setHasMore)           
        }
    },[page,search,hasMore,token]);
    const fetchData = async () => {
        const apiUrl = 'https://eaf-dms-api.yecor.com/api/auth/login'
        const requestData = {
            email: 'yagnikoo@yopmail.com',
            password: 'Moweb@123',
            device_id: 'sDUhIoUzN41Is4iM1r0BcsDP4exWLpInVxuT50Ft',
            device_token: 'cyKtfAZpI9GBrLUfz8SgWV:APA91bEECZrhEE80WnlJmEOiX6_EJ-JtDF9IV5eW96wgj-ghSJ7c3K5ZG9Psh8CMyYWcoDxDcfU805SDRpBdoJompANG3YTp0aeR4wlT5tiWZdmK-3KPq7kECF8raRLRfh0qW3TN1SnA',
            device_type: 'web',
        }
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                console.log(data.token)
                setToken("")
                setToken(data.token)
                localStorage.setItem('token',data.token)
                console.log('API response:', data)

            } else {
                console.error('API request failed:', response.statusText)
            }
        } catch (error) {
            console.log("hello1")
            console.log("this is error code",error.code)
            console.log("hello2")
            console.error('Error:', error)
        }
    };
     
    const fetchInventoryData = async (inventoryApiUrl, token, setInventory, setHasMore) => {
        try {  
            const response = await fetch(inventoryApiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const inventoryData = await response.json()                  
                setInventory(inventoryData.results)            
                                        
                console.log("this is null::",inventoryData.next)
            } else {
                console.error('Inventory API request failed:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1)
      }
   
    return (
        <div className="text-center">
            <h1>Stock</h1>
            <br></br>
            <Basic names={inventory} token={token} loadMore={handleLoadMore} hasMore={hasMore} page={page} setHasMore={setHasMore} setPage={setPage} fetchInventoryData={fetchInventoryData} search={search} setInventory={setInventory}/>
        </div>
    )
}
export default Stock 