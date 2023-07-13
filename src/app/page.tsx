"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import styles from './page.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { uuid } from 'uuidv4';
import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';


export default function Home() {
  const trans = JSON.parse(localStorage.getItem('transactions') || '[]');
  const [transactions, setTransactions] = useState(trans);
  const data = trans?.reverse().map((t,i) => Object.assign({ x: i, y: parseFloat(t.valueTransaction) }));
  console.log(data)

  const setReceiveTransaction = () => {
    const trans = JSON.parse(localStorage.getItem('transactions') || '[]');
    const nameTransaction = document.getElementById('name-transaction')?.value;
    const valueTransaction = document.getElementById('value-transaction')?.value;
    document.getElementById('name-transaction').value = "";
    document.getElementById('value-transaction').value = "";

    trans.unshift({ id: uuid(), nameTransaction, valueTransaction, date: Date() });
    localStorage.setItem('transactions', JSON.stringify(trans));
    setTransactions(trans);
  }

  const setPayTransaction = () => {
    const trans = JSON.parse(localStorage.getItem('transactions') || '[]');
    const nameTransaction = document.getElementById('name-transaction')?.value;
    const valueTransaction = document.getElementById('value-transaction')?.value;
    document.getElementById('name-transaction').value = "";
    document.getElementById('value-transaction').value = "";

    trans.unshift({ id: uuid(), nameTransaction, valueTransaction: valueTransaction * (-1), date: Date.now() });
    localStorage.setItem('transactions', JSON.stringify(trans));
    setTransactions(trans);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form.Control type="text" placeholder="Nome da transação" id="name-transaction" />
        <Form.Control type="number" placeholder="Valor" id="value-transaction" />
        <Button variant="success" onClick={setReceiveTransaction}>Receber</Button>
        <Button variant="danger" onClick={setPayTransaction}>Pagar</Button>
      </div>
      <br />
      <div className={styles.grid}>
        <p>total disponível: {transactions?.reduce((acc, curr) => parseFloat(curr.valueTransaction) + acc, 0)}</p>
        <Table hover style={{ width: '100%' }}>
          <tbody>
            {transactions.map(t =>
              <tr key={t.id}>
                <td key={'n' + t.id}>{t.nameTransaction}</td>
                <td key={'v' + t.id}>{t.valueTransaction > 0 ? <p style={{ color: 'green' }}>▲ {t.valueTransaction}</p> : <p style={{ color: 'red' }}>▼ {t.valueTransaction}</p>}</td>
                <td key={'d' + t.id}>{t.date}</td>
              </tr>
            )}
          </tbody>
        </Table>
         <LineChart
         width={400} height={300} 
          data={data}
        />
      </div>
    </main>
  )
}
