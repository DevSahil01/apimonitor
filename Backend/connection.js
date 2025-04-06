import { createClient } from '@clickhouse/client';

const clickhouse=createClient({
    url: 'https://crnq3xzael.germanywestcentral.azure.clickhouse.cloud:8443',
    username: 'default',
    database:"default",
    password:"Zsdw~ScIK8JHo",
    database:'default',
    protocol: 'https',                  
    tls: {},    
  })

console.log("Connection is successful")

export default clickhouse;