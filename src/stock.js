import React, { useState, useEffect } from "react"
import Basic from "./Components/Basic"

function Stock() {
    const [token, setToken] = useState('');
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        if (token) {
            const inventoryApiUrl = 'https://eaf-dms-api.yecor.com/api/inventory/product-SKUs/?warehouse_id=22&ordering=name&search=&limit=10&offset=&remove_product_stocking=true';

            const fetchInventoryData = async () => {
                try {
                    const response = await fetch(inventoryApiUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const inventoryData = await response.json();
                        console.log('Inventory API response:', inventoryData);
                        //console.log("this is inventory data:", inventoryData.results)
                        setInventory(inventoryData.results)
                    } else {
                        console.error('Inventory API request failed:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchInventoryData();
        }
    }, [token]);
    const fetchData = async () => {
        const apiUrl = 'https://eaf-dms-api.yecor.com/api/auth/login'
        const requestData = {
            email: 'yagnikoo@yopmail.com',
            password: 'Moweb@123',
            device_id: 'sDUhIoUzN41Is4iM1r0BcsDP4exWLpInVxuT50Ft',
            device_token: 'cyKtfAZpI9GBrLUfz8SgWV:APA91bEECZrhEE80WnlJmEOiX6_EJ-JtDF9IV5eW96wgj-ghSJ7c3K5ZG9Psh8CMyYWcoDxDcfU805SDRpBdoJompANG3YTp0aeR4wlT5tiWZdmK-3KPq7kECF8raRLRfh0qW3TN1SnA',
            device_type: 'web',
        };
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
                setToken(data.token)
                console.log('API response:', data);

            } else {
                console.error('API request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="text-center">
            <h1>Stock</h1>
            <br></br>
            <Basic names={inventory} token={token}/>
        </div>
    )
}

export default Stock