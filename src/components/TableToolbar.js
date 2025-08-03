import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FaUnlock, FaBan, FaTrash } from 'react-icons/fa';

function TableToolbar({ onBlock, onUnblock, onDelete, selectedCount, message, variant }) {
    return (
        <div className="mb-3">
            {message && <Alert variant={variant} className="mb-3">{message}</Alert>}
            <div className="d-flex justify-content-start">
                <Button variant="warning" className="me-2" onClick={onBlock} disabled={selectedCount === 0}>
                    <FaBan className="me-1" /> Block
                </Button>
                <Button variant="success" className="me-2" onClick={onUnblock} disabled={selectedCount === 0}>
                    <FaUnlock className="me-1" /> Unblock
                </Button>
                <Button variant="danger" onClick={onDelete} disabled={selectedCount === 0}>
                    <FaTrash className="me-1" /> Delete
                </Button>
            </div>
        </div>
    );
}

export default TableToolbar;
