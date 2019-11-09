const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../../middleware/auth');

const Project = require('../../models/Project');
const User = require('../../models/User');

// TASKS

// updated from put to post
// @route   POST api/project/:id/createNewTask
// @desc    project route
// @access  Public
router.post('/:id/task', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { column, content, taskId } = req.body;
    const columnId = column.id;

    // add new task to end of tasks
    project.board.tasks.push({ id: taskId, content });

    // add task to taskList in appropriate column (in the first position)
    project.board.columns.forEach(column => {
      if (column.id === columnId) {
        column.taskIds.unshift(taskId);
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/project/:id/deleteTask/:columnId/:taskId
// @desc    project route
// @access  Public
router.delete('/:id/task/:columnId/:taskId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const taskId = req.params.taskId;
    const columnId = req.params.columnId;

    // remove task with taskId
    project.board.tasks.forEach((task, i) => {
      if (task.id === taskId) {
        project.board.tasks.splice(i, 1);
      }
    });

    // remove taskId string from appropriate column
    project.board.columns.forEach(column => {
      if (column.id === columnId) {
        column.taskIds.forEach((oldTaskId, i) => {
          if (oldTaskId === taskId) {
            column.taskIds.splice(i, 1);
          }
        });
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/project/:id/setTaskTitle
// @desc    project route
// @access  Public
router.put('/:id/task/title', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { task, content } = req.body;
    const { id } = task;

    project.board.tasks.forEach(task => {
      if (task.id === id) {
        task.content = content;
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// COLUMNS
// @route   PUT api/project/:id/setTaskInSameColumn
// @desc    project route
// @access  Public
router.put('/:id/column/same', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { column } = req.body;
    const { id, taskIds } = column;

    // find the column by id and set its taskIds to the new order
    project.board.columns.forEach(column => {
      if (column.id === id) {
        column.taskIds = taskIds;
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/project/:id/setTaskInNewColumn
// @desc    project route
// @access  Public
router.put('/:id/column/different', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { startColumn, finishColumn } = req.body;

    const startId = startColumn.id;
    const startTaskIds = startColumn.taskIds;

    const finishId = finishColumn.id;
    const finishTaskIds = finishColumn.taskIds;

    // find the columns by id and set their taskIds to the new order
    project.board.columns.forEach(column => {
      if (column.id === startId) {
        column.taskIds = startTaskIds;
      }
      if (column.id === finishId) {
        column.taskIds = finishTaskIds;
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// updated from put to post
// @route   POST api/project/:id/createColumn
// @desc    project route
// @access  Public
router.post('/:id/column', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { columnId, title } = req.body;

    // add new column to the end of the columns array
    project.board.columns.push({
      taskIds: [],
      id: columnId,
      title
    });

    // add new column's reference to the end of the columnOrder array
    project.board.columnOrder.push(columnId);

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/project/:id/deleteColumn
// @desc    project route
// @access  Public
router.delete('/:id/column/:columnId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { columnId } = req.params;

    // const taskIdsToDelete = [...project.board.columns[columnId].taskIds];
    let taskIdsToDelete = [];

    project.board.columns.forEach(column => {
      if (column.id === columnId) {
        taskIdsToDelete = column.taskIds;
      }
    });

    project.board.columns.forEach((column, i) => {
      if (column.id === columnId) {
        project.board.columns.splice(i, 1);
      }
    });

    taskIdsToDelete.forEach(taskIdToDelete => {
      project.board.tasks.forEach((task, i) => {
        if (task.id === taskIdToDelete) {
          project.board.tasks.splice(i, 1);
        }
      });
    });

    project.board.columnOrder.forEach((column, i) => {
      if (column === columnId) {
        project.board.columnOrder.splice(i, 1);
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/project/:id/setColumnTitle
// @desc    project route
// @access  Public
router.put('/:id/column/title', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { column, title } = req.body;
    const { id } = column;

    project.board.columns.forEach(column => {
      if (column.id === id) {
        column.title = title;
      }
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// COLUMN ORDER

// @route   PUT api/project/:id/setColumnOrder
// @desc    project route
// @access  Public
router.put('/:id/columnorder', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { columnOrder } = req.body;

    project.board.columnOrder = columnOrder;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
