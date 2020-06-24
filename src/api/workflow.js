
var workflow = [
    {
        id: 1,
        name: 'Workflow 1',
        status: 'completed',
        deleted: false,
        nodes: [
            {
                id: 0,
                title: 'Node 1',
                content: 'Content 1',
                status: 'pending'
            },
            {
                id: 1,
                title: 'Node 2',
                content: 'Content 2',
                status: 'in-progress'
            },
            {
                id: 2,
                title: 'Node 3',
                content: 'Content 3',
                status: 'completed'
            }
        ]
    },
    {
        id: 2,
        name: 'Workflow 2',
        status: 'pending',
        deleted: false,
        nodes: [
            {
                id: 0,
                title: 'Node 1',
                content: 'Content 1',
                status: 'completed'
            },
            {
                id: 1,
                title: 'Node 2',
                content: 'Content 2',
                status: 'completed'
            },
            {
                id: 2,
                title: 'Node 3',
                content: 'Content 3',
                status: 'completed'
            }
        ]
    },
    {
        id: 3,
        name: 'Workflow 3',
        status: 'pending',
        deleted: false,
        nodes: [
            {
                id: 0,
                title: 'Node 1',
                content: 'Content 1',
                status: 'pending'
            },
            {
                id: 1,
                title: 'Node 2',
                content: 'Content 2',
                status: 'in-progress'
            },
            {
                id: 2,
                title: 'Node 3',
                content: 'Content 3',
                status: 'completed'
            }
        ]
    }
];

export default workflow;