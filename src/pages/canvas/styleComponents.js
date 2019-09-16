import styled from 'styled-components'

export const CanvasInnerCustom = styled.div`
width: 100%;
position: relative;
cursor: move;
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
    background-color: #fff;
    width: auto;
    height: 13500px;
    overflow-x: scroll;
    cursor: not-allowed;
    outline: none !important;
    background-repeat: no-repeat;
    background: 
        linear-gradient(
            180deg,
            #fff 0px,
            #fff 950px, 
            #f3f3f3 950px,
            #f3f3f3 2000px, 
            #fff 2000px,
            #fff 3200px, 
            #f3f3f3 3200px,
            #f3f3f3 4850px, 
            #fff 4850px,
            #fff 7100px,
            #f3f3f3 7100px,
            #f3f3f3 9050px,
            #fff 9050px,
            #fff 10850px,
            #f3f3f3 10850px,
            #f3f3f3 11950px,
            #fff 11950px
    );
`;