import styled from 'styled-components'

export const CanvasInnerCustom = styled.div`
width: 200px;
position: relative;
cursor: move;
height: auto;
`;

export const Outer = styled.div`
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 0px rgba(239,235,233,0), 
    10px -12px 20px -4px rgba(144,148,154,0.38);
`;

export const CanvasOuterCustom = styled.div`
    text-align: center
    position: relative;
    background-size: 10px 10px;
    width: auto;
    height: 13500px;
    overflow: hidden;
    cursor: not-allowed;
    outline: none !important;
    background-repeat: no-repeat;
    background: linear-gradient(90deg, 
        rgb(255, 171, 64 , 0.1) 0%,
        rgb(255, 171, 64 , 0.1) 25%,
        rgb(142, 124, 195 , 0.1) 25%, 
        rgb(142, 124, 195 , 0.1) 50%,
        rgb(106, 168, 79 , 0.1) 50%,
        rgb(106, 168, 79 , 0.1) 75%,
        rgb(109, 158, 235 , 0.1) 75%,
        rgb(109, 158, 235 , 0.1) 75%);
`;