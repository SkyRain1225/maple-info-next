import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  .ranking_number {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  > .left_info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    padding-left: 0.5rem;

    > .user_info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      > .streamer {
        display: flex;
        font-weight: 400;
        font-size: 1.2rem;
        color: #343541;
      }

      > .user_nickname {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        > .user_server {
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      }
    }

    > .user_avatar {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100px;
      min-width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.lightgrey};
      > .avatar_img {
        position: absolute;
        object-fit: contain;
        top: -2.95rem;
        left: -2rem;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }
    }

    @media screen and (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.6rem;
      padding-left: 0.5rem;

      > .user_info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        > .streamer {
          display: flex;
          font-weight: 400;
          font-size: 1rem;
          color: #343541;
        }

        > .user_nickname {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
      }

      > .user_avatar {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 70px;
        min-width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        background-color: ${({ theme }) => theme.colors.lightgrey};

        > .avatar_img {
          position: absolute;
          object-fit: contain;
          top: 39%;
          left: 53%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
        }
      }
    }
  }

  > .user_exp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: right;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: lighter;
    height: 126px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey};

    @media screen and (max-width: 768px) {
      &:nth-child(2) {
        font-size: 11px;
      }
      font-size: 12px;
    }

    &:nth-child(1) {
      width: 14%;
    }
    &:nth-child(2) {
      width: 29%;
    }
    &:nth-child(3) {
      width: 17%;
    }
    &:nth-child(4) {
      width: 11%;
    }
    &:nth-child(5) {
      width: 16%;
    }
    &:nth-child(6) {
      width: 12%;
    }
  }
  @media screen and (max-width: 768px) {
    > div {
      height: 90px;
    }
  }
`;
