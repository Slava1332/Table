
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import GetReq from '../Functions/GetReq'

import { SearchName } from '../Components/SearchName'

export default async function Index() {
    
    
    let items = await GetReq(`http://localhost:5000/api/buy_price/buff_price/item_base/1/min_price1=5/min_price2=1/count=50/sort=asc`)
    
    
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                           
                        <SearchName/>
                        </TableCell>
                        <TableCell>Площадки</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Прибыль</TableCell>
                        
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {
                    items.map((item) => <TableRow className='item' key={Math.random()} >
                    <TableCell className="name">{item[0]}</TableCell>
                    <TableCell className='services'>
                        <div className='service steam'>
                            <a href={`https://steamcommunity.com/market/listings/730/${item[0]}`}><img className='steam' src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_Logo.png' height={40}/></a>
                            <div className='count'>{item[1]} шт</div>
                        </div>
                        <div className='service buff'>
                        <a href={`https://buff.163.com/market/dota2#tab=selling&page_num=1&search=${item[0]}`}><img className='buff' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAADuog7zpQ74qQ+lcArVkQwbEgHxpA4TDACtdgpFLwTZlA0pHALSjwyFWgjJiQyUZQj8rA94UgeSYwiaaQm8gAvlnA2xeAsfFQFXOwXimg3roA5KMgSIXQg5JwMWDwBmRgYkGAJyTQYKBwAtHgPEhQs+KgNPNgR8VQcRW23SAAAC0klEQVR4nO3a6XaiMABAYQxisJS61K1o9xnb93/CmSEoCmStc4547vfLaoLcYrRQowgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmg+9DGuJ07LO571W34blzNGjRmGjb+pcY+2vZh7Fa5j4WH2eZyY/fs5nui3PC23PLs/n2EQL9S4xDZu7VU4FgMPcT0xk39/lqbCcstxXZhI88bFVI3LbePGmmekkMKeF8Ym9S/h9J0msFBqn2a2OC00jAt5p4k3ryOdNJpXfVIM64mBhTKJdE+0SU8KDeNGaUihYcT7Oq5eHcnTyd3hhTa54zhH1sJ5oV6kUg7P7r+ZwqVQ615kX+cP3Ejhx7Y6gGLRfOgmCt+XomsFKrdQ+LE6HsDP9qP9L3w9rsBi1zWx94Ufg8NbaGsFKj0vvD+swLhjBSr9LqxX4LB7VtTvws0yPnwGdq5ApceF8+oADraaFaj0t3BdHcCBXM4fmp5/fm5RfDc22VroueO40MLieHYmzddpQs8PNVdnmoX2caGFmen88z+cAbf/Huw+A26Po5BCCvtbuL/rsh92/iYCPg+zl/Mt7351FjqMCy007299R38/8TUo1M6gsI1CTxQeUKidQWEbhZ4oPPAvfLzSwnTa6fG3tBTuFt0zrq0wnWi+X6POaPSFu5VmxrUVTsxfXNAW3m01p5XXVmgJbBWKqnCnC2wVityt0GGcT6FQ3xT7tAU2C2WxL29/aQObhXK1dyp0GedRKB8cAxuFcnVX3tS+RFuFTjue11u+UKH4Lm+luf1LfGdXhOXqpbz1NDBMnNUXHxLptuO54zjnwuolGqWb1Oq1npiJQgVGm5HbjES4vfRyccnAaB1/h03MCt+VklXH3CbZXjIwWj8ETsy93womjjs+MfxPL0DoNbro3j4kcIb/lgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgJ/4ASLlCPeDbuAIAAAAASUVORK5CYII=' height={40}/></a>
                        </div>
                    </TableCell>
                    
                    
                    <TableCell className='price-one'>{item[2]} &#165;</TableCell>
                    <TableCell className='price-two'>{item[3]} &#165;</TableCell>
                    <TableCell className='profit'>{Math.round(item[4]*0.86)-100}%</TableCell>
                </TableRow>
                )}
       </TableBody> 
                
            </Table>
        </TableContainer>
  )
}