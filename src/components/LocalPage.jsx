import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query, setQuery] = useState('인하대학교');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_End] = useState(false);

    const getLocal = async() => {
        const url="https://dapi.kakao.com/v2/local/search/keyword.json";
        const config={
            headers: {"Authorization": "KakaoAK b80880fbde422de3fd9b4a4e67c9bb54"},
            params: {query: query, page:page, size:5}
        }
        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_End(result.data.meta.is_end);
    }

    const onSearch = (e) => {
        e.preventDefault();
        getLocal();
    }

    useEffect(()=>{
        getLocal();
        
    },[page]) //의존배열

    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>지역검색</h1>
                <Row className = 'my-3'>
                    <Col md={3} xs={6}>
                        <Form onSubmit={onSearch}>
                            <Form.Control value = {query}
                            onChange = {e=>setQuery(e.target.value)} 
                            placeholder='검색어' />
                        </Form>                      
                        
                    </Col>
                    <Col>검색수 : {total}건</Col>
                </Row>
                <Table>
                    <thead>
                        <tr>
                            <td>장소명</td>
                            <td>전화번호</td>
                            <td>주소</td>
                            <td>위치</td>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map(local=>
                            <tr key={local.id}>
                                <td>{local.place_name}</td>
                                <td>{local.phone}</td>
                                <td>{local.address_name}</td>
                                <td><MapPage local = {local}></MapPage></td>
                            </tr>)}
                    </tbody>
                </Table>
                <div className = 'text-center my-2'>
                    <Button disabled = {page==1} onClick={() => setPage(page-1)} >이전</Button>
                    <span className="mx-3">{page}</span>
                    <Button disabled = {is_end==1} onClick={() => setPage(page+1)}>다음</Button>
                </div>
            </Col>            
        </Row>
    )
}

export default LocalPage