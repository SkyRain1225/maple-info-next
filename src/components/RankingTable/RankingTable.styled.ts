import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .ranking_number {
    display: flex;
    flex-direction: column;
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
      }
    }

    > .user_avatar {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.lightgrey};
      > .avatar_img {
        position: absolute;
        object-fit: contain;
        top: -2.95rem;
        left: -2rem;
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

    &:nth-child(1) {
      min-width: 170px;
      width: 170px;
    }
    &:nth-child(2) {
      min-width: 352px;
      width: 352px;
    }
    &:nth-child(3) {
      min-width: 200px;
      width: 200px;
    }
    &:nth-child(4) {
      min-width: 132px;
      width: 132px;
    }
    &:nth-child(5) {
      min-width: 197px;
      width: 197px;
    }
    &:nth-child(6) {
      min-width: 149px;
      width: 149px;
    }
  }
`;
