import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TaskCard = ({ task, onUpdateStatus, onDeleteTask }) => {
    const getBadgeStyle = (status) => {
        switch (status) {
            case 'completed':
                return { bg: 'var(--green-100)', color: 'var(--green-600)', label: 'Completed' };
            case 'in_progress':
                return { bg: 'var(--yellow-100)', color: 'var(--yellow-600)', label: 'In Progress' };
            default:
                return { bg: 'var(--blue-100)', color: 'var(--blue-600)', label: 'To Do' };
        }
    };
    const badge = getBadgeStyle(task.status);
    return (_jsxs("article", { className: "task-card", "data-testid": `task-card-${task.id}`, style: {
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-3)',
            boxShadow: 'var(--shadow-card)'
        }, children: [_jsxs("header", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("h3", { style: { margin: 0, fontSize: '1.1rem', color: 'var(--color-text)' }, children: task.title }), _jsx("span", { "data-testid": "status-badge", style: {
                            backgroundColor: badge.bg,
                            color: badge.color,
                            padding: 'var(--space-1) var(--space-3)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 700
                        }, children: badge.label })] }), _jsxs("footer", { style: { marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }, children: [_jsx("label", { htmlFor: `status-select-${task.id}`, style: { fontSize: '0.85rem', color: 'var(--color-text-muted)' }, children: "Status:" }), _jsxs("select", { id: `status-select-${task.id}`, "data-testid": "task-status-select", value: task.status, onChange: (e) => onUpdateStatus(task.id, e.target.value), "aria-label": `Change status for ${task.title}`, style: {
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            backgroundColor: 'var(--color-bg)',
                            color: 'var(--color-text)'
                        }, children: [_jsx("option", { value: "todo", children: "To Do" }), _jsx("option", { value: "in_progress", children: "In Progress" }), _jsx("option", { value: "completed", children: "Completed" })] }), _jsx("button", { className: "btn-action", "data-testid": "delete-task-btn", onClick: () => onDeleteTask(task.id), "aria-label": `Delete task ${task.title}`, style: {
                            marginLeft: 'auto',
                            padding: 'var(--space-1) var(--space-3)',
                            backgroundColor: '#b91c1c',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontWeight: 700
                        }, children: "Delete" })] })] }));
};
