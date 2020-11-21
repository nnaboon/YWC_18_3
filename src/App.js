import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './components/Box.css';
import Dropdown2 from './components/Dropdown';
import logo from './components/Pic/halfhalf-logo.png';
import logo2 from './components/Pic/halfhalf-logo-mini.png';
import {Dropdown, Icon, Input} from 'semantic-ui-react';
import filter from './components/Pic/filter.png'
import './App.css';
import ReactHtmlParser from 'react-html-parser';
import './components/Dropdown.css';
const App = () => {
    let total = 0;
    const [categorie, setCategories] = useState([]);
    const [province, setProvince] = useState([]);
    const [price, setPrice] = useState([]);
    const [merchant, setMerchant] = useState([]);
    const [value, setValue] = useState("ร้านอาหารและเครื่องดื่ม");
    const [value2, setValue2] = useState("อาหารทั่วไป อาหารตามสั่ง อาหารจานเดียว");
    const [categorie2, setCategories2] = useState([]);

    const trigger = (
        <span>
          <Icon name='map marker alternate' /> พื้นที่ใกล้ฉัน
        </span>
      )

    const handleChange =() => {
        return(
            <div className="wrapper">
                <img id="slide" src="http://lorempixel.com/output/cats-q-c-100-100-4.jpg" />
            </div>
        )
    }


    const CheckSub = () => {
        if(value != '' && value != 'ร้านธงฟ้า'){
        return(
            <div>
                <h4><strong>ประเภท{value}</strong></h4>
                <input type="radio" value="ทั้งหมด" checked={value2 === "ทั้งหมด"} onChange={(e) => setValue2(e.target.value)} />
                <span style={{paddingLeft: 5}}>ทั้งหมด</span>
                {categorie2.map((catt) => {
                    total = total+1;
                    if(total === 14){
                        return false;
                    }else{
                        return (
                            <div>
                                <form>
                                    <label style={{fontWeight: "normal"}}>
                                        <input type="radio" value={catt} checked={value2===catt} onChange={(e) => setValue2(e.target.value)} />
                                        <span style={{paddingLeft: 5}} >{catt}</span>
                                    </label>  
                                    <br /> 
                                </form>
                            </div>
                        )                   
                    }})     
                    
                }
            </div>
        )
        }else{
            return false;
        }
    }

    const Tomap = () => {
        return(
            <div>
                <h4><strong>ประเภทร้านค้า</strong></h4>
                <input type="radio" value="ทั้งหมด" checked={value === ''} onChange={(e) => {setValue(''); setCategories2([]); setValue2('')}} />
                <span style={{paddingLeft: 5}}>ทั้งหมด</span>
                {categorie.map((cat) => {
                        return (
                            <div>
                                <form>
                                    <label style={{fontWeight: "normal"}}>
                                        <input type="radio" value={cat.name} checked={value===cat.name} onChange={(e) => {setValue(e.target.value); setValue2(''); setCategories2(cat.subcategories); }} />
                                        <span style={{paddingLeft: 5}}>{cat.name}</span>
                                    </label>  
                                    <br /> 
                                </form>
                            </div>
                        )                        
                })}
                <br />
                <h4><strong>จังหวัด/ใกล้ฉัน</strong></h4>
                <Dropdown2 prices={province}/>
                <br />

                <h4><strong>ราคา</strong></h4>
                <Dropdown2 prices={price}/>
                <br />
                <CheckSub />
            </div>   
        );
                              
    };


    const FilterShop = () => {
        {console.log(value)}
        if(value == ''){
            return(
                <div>
                    {merchant.map(shop => {
                        // {console.log(shop.highlightText)}
                        {console.log(ReactHtmlParser(shop.highlightText))}
                        return(
                            <div className="main">
                                <div className="cajaContenido col-sm-12">
                                    <img className="ShopPic" src={shop.coverImageId} />
                                        <div className="ShopDetail">
                                            <h2><strong>{shop.shopNameTH}</strong></h2>
                                            {shop.subcategoryName} | $ | {shop.addressDistrictName} {shop.addressProvinceName} <br />
                                            {shop.highlightText} <br />
                                            <hr className="new1"/>
                                            <strong>เมนูแนะนำ</strong> <s/>
                                            {shop.recommendedItems.join(', ')}
                                        </div>
                                    </div>
                            </div>
                        )
                    })}                
                </div>
                
            )
        }else{
            return (
                <div> 
                        <div>
                            {merchant.filter(shops => shops.subcategoryName === value2).map( shop2 => (
                                <div className="main">
                                    <div className="cajaContenido col-sm-12">
                                    <img className="ShopPic" src={shop2.coverImageId} />
                                    <div className="ShopDetail">
                                        <h2><strong>{shop2.shopNameTH}</strong></h2>
                                        {shop2.subcategoryName} | $ | {shop2.addressDistrictName} {shop2.addressProvinceName} <br />
                                        <hr className="new1"/>
                                        {shop2.highlightText} <br />
                                        <strong>เมนูแนะนำ</strong> <s/>
                                        {shop2.recommendedItems.join(', ')}
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
            )            
        }
        
    }

    useEffect(() => {
        axios.get('https://panjs.com/ywc18.json').then((response) => {
            setCategories(response.data.categories);
            setPrice(response.data.priceRange);
            setProvince(response.data.provinces);
            setMerchant(response.data.merchants);
            setCategories2(response.data.categories[0].subcategories)
            console.log(response);
        })
    },[]);

    return (
        <div>
            <div className="navbar">
                <img className="LogoPic visible-lg visible-md visible-sm" src={logo} /><t /><s />
                <img className="LogoPic visible-xs" src={logo2} /><t /><s />
                <Dropdown className="drowdown visible-lg visible-md visible-sm" search selection trigger={trigger}/>
                <Input className="searchbar" fluid action={{ icon: 'search' }} placeholder='ค้น ชื่อ ร้านอาหาร และ เครื่องดื่ม ร้านธงฟ้า ร้านOTOP และ ร้านทั่วไป' />
                <img className="visible-xs" src={filter} onClick={handleChange} /><t /><s />
            </div>
            <div className="header">
                <div className="header_box">หน้าแรก / <strong>ค้นหา</strong></div>
            </div>
            <br />
            <h3 style={{paddingLeft: 10}}><strong>ผลการค้นหา {value} ทั้งหมด</strong></h3>
            <br />
            <div className="menu">
                <Tomap />
            </div>
            <div className="bigmain">
                <FilterShop />
            </div>
        </div>
    );
}

export default App;