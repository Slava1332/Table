"use client"

import Select from 'react-select';
import './Sort.css'
import { useState } from 'react';

import Button from '@mui/material-next/Button'

const serviceOptions = [
    { value: 'buy_price', label: 'Steam' },
    { value: 'buff_price', label: 'Buff163' },
    { value: 'price_on_c5game', label: 'C5game' }
  ]

  const priceOptions = [
    { value: 'обычная', label: 'обычная'},
    { value: 'автобай', label: 'автобай'},
    { value: 'средняя', label: 'средняя'}
    
]

let _minPrice1 = 1
let _minPrice2 = 1
let _maxPrice1 = 1
let _maxPrice2 = 1
let _minCount1 = 1
let _minCount2 = 1
let _service1  = serviceOptions[0].value
let _service2  = serviceOptions[1].value
let _price1 = null
let _price2 = null

export  function Sort()  {
    
    

    
    const [minPrice1, setMinPrice1] = useState('')
    const [minPrice2, setMinPrice2] = useState('')
    const [maxPrice1, setMaxPrice1] = useState('')
    const [maxPrice2, setMaxPrice2] = useState('')
    const [minCount1, setMinCount1] = useState('')
    const [minCount2, setMinCount2] = useState('')    
    const [service1, setService1] = useState(serviceOptions[0])    
    const [service2, setService2] = useState(serviceOptions[1])
    const [price1, setPrice1] = useState(priceOptions[0])
    const [price2, setPrice2] = useState(priceOptions[0])    
    


    
    function getMinPrice1(e) {
        setMinPrice1(e.target.value)
        _minPrice1 = e.target.value
        console.log(minPrice1)
    }

    function getMaxPrice1(e) {
        setMaxPrice1(e.target.value)
        _maxPrice1 = e.target.value
        console.log(_maxPrice1)
    }
    
    function getMinCount1(e) {
        setMinCount1(e.target.value)
        _minCount1 = e.target.value
        console.log(_minCount1)
        
    }

    function getMinPrice2(e) {
        setMinPrice2(e.target.value)
        _minPrice2 = e.target.value
        console.log(_minPrice2)
    }

    function getMaxPrice2(e) {
        setMaxPrice2(e.target.value)
        _maxPrice2 = e.target.value
        console.log(_maxPrice2)
    }

    function getMinCount2(e) {
        setMinCount2(e.target.value)
        _minCount2 = e.target.value
        console.log(_minCount2)
        
    }

    
    
    function editService1(e){
        setService1(e.value)
        console.log(e.value)
    }

    function editService2(e){
        setService2(e.value)
        console.log(e.value)
    }
    
    function editPrice1(e) {
        setPrice1(e.value)
        console.log(e.value)
        localStorage.setItem('price1', e.value)
    }

    function editPrice2(e) {
        setPrice2(e.value)
        console.log(e.value)
        localStorage.setItem('price2', e.value)
    }
    
  return (
    <div className='sort-container'>
        
        <div className='choose-container'>
            <div className="choose-game">123</div>
            <div className="choose-currency">3123</div>
            <div className="choose-params">123</div>
        </div>

        <div className='sort'>
            <div className='service first-service'>
                <div className='select'>
                    <div className='select-service'>
                        <div className='select-name'>
                            Первый сервис:
                        </div>
                        <Select className='select-item' options={serviceOptions} defaultValue={service1} onChange={editService1}/>
                    </div>
                    
                    <div className='select-price-container'> 
                        <div className='select-name'>
                                Цена:
                        </div>
                        <Select className='select-item' options={priceOptions} defaultValue={price1} onChange={editPrice1}/>
                    </div>
                    
                </div>
                    <div className='filter-container'>
                        <div className="filter max-price">
                                Мин:
                                <input  className='input-item' type='text' value={minPrice1} placeholder='руб' onChange={getMinPrice1}/>
                            </div>
                            <div className="filter min-price">
                                Макс:
                                <input  className='input-item' type='text' value={maxPrice1} placeholder='руб' onChange={getMaxPrice1}/>
                            </div>
                            <div className="filter min-count">
                                Мин Кол-во:
                                <input  className='input-item' type='text' value={minCount1} placeholder='шт' onChange={getMinCount1}/>
                            </div>
                    </div>
                
            </div>
            
            <div className="reload" >обновить <br/> &#x21ba;</div>
            <div className='service second-service'>
                <div className='select'>
                    <div className='select-service'>
                    <div className='select-name'>
                            Второй сервис:
                        </div>
                        
                        <Select className='select-item' options={serviceOptions} defaultValue={service2} onChange={editService2} />
                    </div>
                    <div className='select-price-container'> 
                        <div className='select-name'>
                                Цена:
                        </div>
                        <Select className='select-item' options={priceOptions} defaultValue={price2} onChange={editPrice2}/>
                    </div>
                </div>
                    <div className='filter-container'>
                        <div className="filter max-price">
                            Мин:
                            <input  className='input-item' type='text' value={minPrice2} placeholder='руб' onChange={getMinPrice2}/>
                        </div>
                        <div className="filter min-price">
                            Макс:
                            <input  className='input-item' type='text' value={maxPrice2} placeholder='руб' onChange={getMaxPrice2}/>
                        </div>
                        <div className="filter min-count">
                            Мин Кол-во:
                            <input  className='input-item' type='text' value={minCount2} placeholder='шт' onChange={getMinCount2}/>
                        </div>
                    </div>
            </div>
            
        </div>
        <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => {
                console.log(minPrice1)
            }}
        >
            Обновить
        </Button>
    </div>
  )
  
}
