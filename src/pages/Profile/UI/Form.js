import styled from 'styled-components';

const whiteBg =  '#fff';
const blackBg = '#25232323';

export const Form = styled.form.attrs({
	noValidate: true,
	autoComplete: 'off'
})`
	margin: auto;
	max-width: 45rem;
	width: 100%;
	background-color: ${whiteBg};
	padding: 3.5rem;
	box-shadow: 0 .5rem 1.5rem ${blackBg};
	border-radius: 2.5rem;
`;