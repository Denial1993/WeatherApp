//設定地區天氣
import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { availableLocations } from "./utils";

const locations = availableLocations.map((location) => location.cityName);

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const WeatherSetting = ({ setCurrentPage, cityName, setCurrentCity }) => {
  // 使用 useRef 建立一個 ref，取名為 inputLocationRef
  // const inputLocationRef = useRef(null);
  const [locationName, setLocationName] = useState(cityName);

  // //定義 handleChange 要做的事
  const handleChange = (e) => {
    //把使用者輸入的內容更新到 React 內的資料狀態
    setLocationName(e.target.value);
  };

  const handleSave = () => {
    // const locationName = inputLocationRef.current.value;

    if (locations.includes(locationName)) {
      console.log(`儲存的地區資訊為：${locationName}`);

      // 按下儲存時更新 WeatherApp 內的 currentCity
      setCurrentCity(locationName);

      //透過 setCurrentPage 導回天氣資訊頁
      setCurrentPage("WeatherCard");
    } else {
      alert(`儲存失敗: 您輸入的 ${locationName} 並非有效的地區!!!!!!`);
    }
    return;
  };

  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>

      {/* ：使用 onChange 事件來監聽使用者輸入資料 */}
      <StyledInputList
        // {/*  將 useRef 回傳的物件，指稱為該 input 元素 */}
        // {/* 在 uncontrolled components 中可以使用 defaultValue 定義預設值 */}
        // ref={inputLocationRef
        defaultValue="臺南市"
        list="location-list"
        id="location"
        name="location"
        onChange={handleChange}
        value={locationName}
      />

      <datalist id="location-list">
        {/* 利用迴圈的方式跑出所有 option */}
        {locations.map((location) => {
          return <option value={location} key={location} />;
        })}
      </datalist>
      <ButtonGroup>
        <Back onClick={() => setCurrentPage("WeatherCard")}>返回</Back>
        {/* STEP 5：將 handleSave 綁定在 onClick 事件 */}
        <Save onClick={handleSave}>儲存</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  );
};

export default WeatherSetting;
