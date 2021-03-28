import styled from 'styled-components';

export const Container = styled.div`
    .fade-appear,
    .fade-enter {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
    }
    .fade-appear-active,
    .fade-enter-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: opacity 300ms, transform 200ms;
    }

    .fade-exit {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .fade-exit-active {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
        transition: opacity 300ms, transform 200ms;
    }
`;

export const Mask = styled.div`
    position: fixed;
    z-index: 2147483647;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: rgba(0, 0, 0, 0.8); */
    background: #fff;
`;

export const CloseBtn = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    font-size: 16px;
    font-weight: bold;
    padding: 3px 15px;
`;
