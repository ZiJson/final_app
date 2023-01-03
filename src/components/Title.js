import styled from 'styled-components';
import { Button, Input, Tag, message, Tabs } from 'antd'
const Wrapper = styled.div`
min-width: auto;
display: flex;
align-items: center;
justify-content: center;
h1 {
margin: 0;
font-size: 3em;
}`;
const Title = ({name, clean}) => (
<Wrapper><h1>Final Project Platform</h1>
{clean?<Button type="primary" danger onClick={clean} >
                Clear
            </Button>:''}</Wrapper>
);

export default Title;