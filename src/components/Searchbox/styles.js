import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 40%;
  border: 1px solid lightgray;

  input {
    flex: 1;
    border: none;
    padding: 5px;
  }

  button {
    width: 50px;
    border: none;
    border-left: 1px solid lightgray;
    padding: auto;
  }

  @media only screen and (max-width: 490px) {
    display: none;
  }
`;
