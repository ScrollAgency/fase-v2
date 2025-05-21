import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { format, addHours, addMinutes } from 'date-fns';
import styles from './Kanban.module.css';

interface ApiTask {
  id: number;
  title: string;
  date_start: string;
  estimated_duration: string;
  general_description: string;
  type: string;
  thematic: string;
}

interface Task {
  id: string;
  title: string;
  date_start: string;
  date_end: string;
  description: string;
  type: string;
  thematic: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanData {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

interface KanbanProps {
  tasks: Task[];
  containerClassName?: string;
  columnClassName?: string;
  cardClassName?: string;
  minHeight?: string;
  cardMinWidth?: string;
  cardMaxWidth?: string;
  groupBy?: 'type' | 'thematic';
  sortBy?: 'date_start' | 'date_end' | 'title';
  sortDirection?: 'asc' | 'desc';
  searchTerm?: string;
  showFilters?: boolean;
  columnColors?: {
    backgroundColor?: string;
    textColor?: string;
  };
  taskColors?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  onTaskMove?: (taskId: string, newGroup: string) => void;
  onTaskClick?: (taskId: string) => void;
  onSortChange?: (sortBy: string) => void;
  onSortDirectionChange?: (direction: string) => void;
  onSearch?: (searchTerm: string) => void;
}

const transformApiTask = (apiTask: ApiTask): Task => {
  const [hours, minutes] = apiTask.estimated_duration.split(':').map(Number);
  const startDate = new Date(apiTask.date_start);
  const endDate = addMinutes(addHours(startDate, hours), minutes);

  return {
    id: apiTask.id.toString(),
    title: apiTask.title,
    date_start: apiTask.date_start,
    date_end: endDate.toISOString(),
    description: apiTask.general_description,
    type: apiTask.type,
    thematic: apiTask.thematic
  };
};

const filterTasksBySearch = (tasks: Task[], searchTerm: string): Task[] => {
  if (!searchTerm) return tasks;
  const lowerSearchTerm = searchTerm.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowerSearchTerm) ||
    task.description.toLowerCase().includes(lowerSearchTerm)
  );
};

const sortTasks = (tasks: Task[], sortBy: string, sortDirection: 'asc' | 'desc'): Task[] => {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date_start':
        comparison = new Date(a.date_start).getTime() - new Date(b.date_start).getTime();
        break;
      case 'date_end':
        comparison = new Date(a.date_end).getTime() - new Date(b.date_end).getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      default:
        return 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

const Kanban: React.FC<KanbanProps> = ({
  tasks = [],
  containerClassName = "",
  columnClassName = "",
  cardClassName = "",
  minHeight = "500px",
  cardMinWidth = "280px",
  cardMaxWidth = "320px",
  groupBy = "type",
  sortBy = "date_start",
  sortDirection = "asc",
  searchTerm = "",
  showFilters = true,
  columnColors = {
    backgroundColor: "#EDF2F7",
    textColor: "#2D3748"
  },
  taskColors = {
    backgroundColor: "#ffffff",
    textColor: "#131013",
    borderColor: "#E2E8F0"
  },
  onTaskMove,
  onTaskClick,
  onSortChange,
  onSortDirectionChange,
  onSearch
}) => {
  const processedTasks = useMemo(() => {
    let filteredTasks = (tasks as unknown as ApiTask[]).map(transformApiTask);
    filteredTasks = filterTasksBySearch(filteredTasks, searchTerm);
    return sortTasks(filteredTasks, sortBy, sortDirection);
  }, [tasks, searchTerm, sortBy, sortDirection]);

  const columnTypes = useMemo(() => {
    const uniqueValues = Array.from(new Set(processedTasks.map(task => task[groupBy])));
    return uniqueValues.length > 0 ? uniqueValues : ['Default'];
  }, [processedTasks, groupBy]);

  const [data, setData] = useState<KanbanData>(() => {
    const initialColumns = columnTypes.reduce((acc, type) => {
      acc[type] = {
        id: type,
        title: type,
        tasks: processedTasks.filter(task => task[groupBy] === type)
      };
      return acc;
    }, {} as { [key: string]: Column });

    return {
      columns: initialColumns,
      columnOrder: columnTypes
    };
  });

  const [movingTaskId, setMovingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const updatedColumns = columnTypes.reduce((acc, type) => {
      acc[type] = {
        id: type,
        title: type,
        tasks: processedTasks.filter(task => task[groupBy] === type)
      };
      return acc;
    }, {} as { [key: string]: Column });

    setData({
      columns: updatedColumns,
      columnOrder: columnTypes
    });
  }, [processedTasks, groupBy, columnTypes]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setMovingTaskId(draggableId);

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    const task = sourceColumn.tasks.find(t => t.id === draggableId);

    if (!task) return;

    const newSourceTasks = Array.from(sourceColumn.tasks);
    newSourceTasks.splice(source.index, 1);

    const updatedTask = {
      ...task,
      type: groupBy === 'type' ? destination.droppableId : task.type,
      thematic: groupBy === 'thematic' ? destination.droppableId : task.thematic
    };

    const newDestTasks = Array.from(destColumn.tasks);
    newDestTasks.splice(destination.index, 0, updatedTask);

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: newSourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: newDestTasks
        }
      }
    };

    setData(newData);
    
    if (onTaskMove) {
      await onTaskMove(draggableId, destination.droppableId);
    }
    
    setTimeout(() => {
      setMovingTaskId(null);
    }, 500);
  };

  const handleTaskClick = (taskId: string) => {
    onTaskClick?.(taskId);
  };

  const FilterControls = showFilters ? (
    <div className={styles.filterControls}>
      <input
        type="text"
        placeholder="Rechercher des tâches..."
        value={searchTerm}
        onChange={(e) => onSearch?.(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange?.(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="date_start">Trier par date de début</option>
        <option value="date_end">Trier par date de fin</option>
        <option value="title">Trier par titre</option>
      </select>
      <button
        type="button"
        onClick={() => onSortDirectionChange?.(sortDirection === 'asc' ? 'desc' : 'asc')}
        className={styles.sortDirectionButton}
      >
        {sortDirection === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  ) : null;

  return (
    <div className={containerClassName}>
      {FilterControls}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={`${styles.kanbanContainer}`}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            return (
              <div 
                key={columnId} 
                className={`${styles.kanbanColumn} ${columnClassName}`}
                style={{
                  minWidth: cardMinWidth,
                  maxWidth: cardMaxWidth
                }}
              >
                <div 
                  className={styles.columnHeader}
                  style={{
                    backgroundColor: columnColors.backgroundColor,
                    color: columnColors.textColor
                  }}
                >
                  {columnId}
                </div>
                <div className="bg-gray-100 rounded-lg rounded-t-none p-4 h-full" style={{ minHeight }}>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 h-full ${styles.droppableColumn} ${snapshot.isDraggingOver ? styles.draggingOver : ''}`}
                        style={{ minHeight: `calc(${minHeight} - 32px)` }}
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.draggableWrapper}`}
                                style={{
                                  ...provided.draggableProps.style,
                                  width: '100%'
                                }}
                              >
                                <div
                                  className={`rounded-lg p-4 shadow-sm cursor-pointer ${styles.taskCard} ${cardClassName} ${movingTaskId === task.id ? styles.moving : ''} ${snapshot.isDragging ? 'shadow-md' : ''}`}
                                  onClick={() => handleTaskClick(task.id)}
                                  style={{
                                    fontFamily: 'Manrope',
                                    backgroundColor: taskColors.backgroundColor,
                                    color: taskColors.textColor,
                                    borderColor: taskColors.borderColor,
                                    borderWidth: '1px',
                                    borderStyle: 'solid'
                                  }}
                                >
                                  <div className="flex items-center gap-1 mb-3" style={{ 
                                    backgroundColor: '#f6f3ef', 
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    width: 'fit-content'
                                  }}>
                                    <span style={{ 
                                      color: '#604e39',
                                      fontSize: '12px',
                                      fontWeight: 'medium'
                                    }}>№</span>
                                    <span style={{ 
                                      color: '#604e39',
                                      fontSize: '12px',
                                      fontWeight: 'medium'
                                    }}>{task.id}</span>
                                  </div>

                                  <div style={{
                                    fontSize: '16px',
                                    fontWeight: 'medium',
                                    color: '#131013',
                                    marginBottom: '12px',
                                    wordBreak: 'break-word'
                                  }}>
                                    {task.title}
                                  </div>

                                  <div 
                                    className={styles.dateContainer}
                                    style={{
                                      fontSize: '14px',
                                      color: '#4d4d4d',
                                      marginBottom: '12px'
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className={styles.dateLabel}>Date et heure de début</span>
                                      <span>{format(new Date(task.date_start), 'dd/MM/yyyy, HH:mm')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={styles.dateLabel}>Date et heure de fin</span>
                                      <span>{format(new Date(task.date_end), 'dd/MM/yyyy, HH:mm')}</span>
                                    </div>
                                  </div>

                                  <div style={{
                                    fontSize: '14px',
                                    color: '#333333'
                                  }}>
                                    <div style={{ marginBottom: '8px' }}>Description</div>
                                    <div style={{ 
                                      whiteSpace: 'pre-wrap',
                                      color: '#4d4d4d',
                                      wordBreak: 'break-word'
                                    }}>
                                      {task.description.split('\n').map((line, index) => (
                                        <div key={index} className="flex items-start">
                                          <span className="mr-2 flex-shrink-0">•</span>
                                          <span>{line.trim()}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Kanban; 