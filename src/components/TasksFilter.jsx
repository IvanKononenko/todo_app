import React from 'react';

const TasksFilter = ({filter, setFilter}) => {
    return (
        <div>
            <input
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                style={{marginRight: '10px'}}
                placeholder="search for..."
            />
            <MySelect
                value={selectedActiveSort}
                onChange={sortTasks}
                defaultValue="sort by..."
                options={[
                    {value: "name", name: "sort by name"},
                    {value: "id", name: "sort by date"}
                ]}
        </div>
    );
};

export default TasksFilter;
