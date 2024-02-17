import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ReportBox = styled.div`
    font-size: 16px;
    background-color: white;
    padding: 1.5rem 1rem;
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
    border-radius: 3px;
    color: #464646;
    margin-bottom: 1.2rem;
    border: 3px solid transparent;
    &.primary {
        border-color: rgb(60, 141, 188);
    }
    &.info {
        border-color: rgb(0, 166, 90);
    }
    &.warning {
        border-color: rgb(243, 156, 50);
    }
    &.danger {
        border-color: rgb(221, 75, 57);
    }
    .report-box-content {
        font-size: 1.6rem;
    }
`;

function SummaryBox({ title, content, className, link }) {
    return (
        <Link to={link}>
            <ReportBox className={className}>
                <div className="report-box-title">{title}</div>
                <div className="report-box-content">{content}</div>
            </ReportBox>
        </Link>
    );
}

export default SummaryBox;
