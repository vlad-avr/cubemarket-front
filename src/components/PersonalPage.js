import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './PersonalPage.css';

const PersonalPage = () => {
    const navigate = useNavigate();

    const getUserFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                balance: decoded.balance || 0,
                role: decoded.role,
            };
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };
    const user = getUserFromToken()
    console.log(user)
    const [userInfo, setUserInfo] = useState(getUserFromToken());
    const [isEditing, setIsEditing] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [showTransactions, setShowTransactions] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
    });
    const [transferAmount, setTransferAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:5051/user/${getUserFromToken().id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json()
                setUserInfo(data);
                setIsEditing(false);
                setIsTransferring(false);
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Failed to update personal data.');
            }
        } catch (error) {
            console.error('Error updating personal data:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    }

    useEffect(() => {
        fetchUserInfo(); // Fetch user info when the component mounts
    }, []);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5051/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            fetchUserInfo()
        } catch (error) {
            console.error('Error updating personal data:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    };

    const handleTransferChange = (e) => {
        setTransferAmount(e.target.value);
    };

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(transferAmount);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        try {
            await fetch('http://localhost:5051/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ balance: amount }),
            });
            fetchUserInfo()
        } catch (error) {
            console.error('Error transferring funds:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    };

    const fetchTransactions = async () => {
        const queryParams = new URLSearchParams({
            buyer: user.id,       
            limit: '20',         
            offset: '0',         
          });
        try {
            const response = await fetch(`http://localhost:5051/transaction/list?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
                setShowTransactions(true);
            } else {
                setErrorMessage('Failed to fetch transaction history.');
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setErrorMessage('Network error. Please try again later.');
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="personal-page">
            <h2>Personal Page</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="personal-info">
                <p><strong>Name:</strong> {userInfo?.name}</p>
                <p><strong>Email:</strong> {userInfo?.email}</p>
                <p><strong>Financial Balance:</strong> ${userInfo?.balance?.toFixed(2)}</p>
                <button onClick={() => setIsEditing(!isEditing)}>Edit Personal Data</button>
                <button onClick={() => setIsTransferring(!isTransferring)}>Transfer Funds</button>
                <button className="pp_button" onClick={fetchTransactions}>View Transactions</button>
                <button onClick={() => navigate('/manage_products')}>Manage Products</button>
                {userInfo?.role === 'admin' || userInfo?.role === "superadmin" && (
                    <button onClick={() => navigate('/manage_users')}>Manage Users</button>
                )}
                <button className="main_b" onClick={() => navigate('/')}>Main Page</button>
                <button className="sign_out" onClick={handleSignOut}>Sign Out</button>
            </div>

            {isEditing && (
                <form onSubmit={handleEditSubmit} className="form-container">
                    <h3>Edit Personal Data</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                        />
                    </label>
                    <button className="pp_button" type="submit">Save</button>
                    <button className="pp_button cancel" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}

            {isTransferring && (
                <form onSubmit={handleTransferSubmit} className="form-container">
                    <h3>Transfer Funds</h3>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={transferAmount}
                            onChange={handleTransferChange}
                            required
                        />
                    </label>
                    <button className="pp_button" type="submit">Transfer</button>
                    <button className="pp_button cancel" type="button" onClick={() => setIsTransferring(false)}>Cancel</button>
                </form>
            )}

            {showTransactions && (
                <div className="transaction-history">
                    <h3>Transaction History</h3>
                    {transactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Amount Sold</th>
                                    <th>Amount Paid</th>
                                    <th>Date</th>
                                    <th>Buyer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.product}</td>
                                        <td>{transaction.amount_sold}</td>
                                        <td>{transaction.amount_payed}</td>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>{transaction.buyer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button
                        className="pp_button"
                        onClick={() => setShowTransactions(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default PersonalPage;
