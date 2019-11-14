const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../../middleware/auth');

const Project = require('../../models/Project');
const User = require('../../models/User');

// @route   GET api/project
// @desc    get a user's projects (no board state)
// @access  Private
router.get('/', auth, async (req, res) => {
  // get all of current user's projects by most recently created
  const userId = new ObjectId(req.user.id);
  try {
    const projects = await Project.find({ users: userId })
      .select('-board')
      .sort({
        date: -1
      });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/project
// @desc    create a new project
// @access  Private
router.post('/', auth, async (req, res) => {
  // console.log('body: ' + JSON.stringify(req.body));
  // console.log('user: ' + JSON.stringify(req.user));

  const userId = new ObjectId(req.user.id);
  const ownerId = new ObjectId(req.user.id);

  const { name, board } = req.body;

  try {
    let project = new Project({
      name,
      owner: ownerId,
      users: [userId],
      board
    });

    await project.save();

    let tempProject = project.toObject();
    delete tempProject.board;

    res.json(tempProject);
    // res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/project
// @desc    create a new project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // console.log(req.body);
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user is authenticated
    // Check if project.users does not include current user's id
    const userId = new ObjectId(req.user.id);
    if (!project.users.includes(userId)) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await project.remove();

    res.json({ msg: 'Project successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/project/:id
// @desc    get a project by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let project;
    // Check if the id is a 12 char string
    if (ObjectId.isValid(req.params.id)) {
      const newObjectId = new ObjectId(req.params.id).toString();
      if (newObjectId === req.params.id) {
        project = await Project.findById(req.params.id);
      }
    } else {
      return res.status(404).json({ msg: 'Invalid object id' });
    }
    // const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/project/:id/users
// @desc    get a project's users
// @access  Private
router.get('/:id/users', auth, async (req, res) => {
  try {
    let project;
    // Check if the id is a 12 char string
    if (ObjectId.isValid(req.params.id)) {
      const newObjectId = new ObjectId(req.params.id).toString();
      if (newObjectId === req.params.id) {
        project = await Project.findById(req.params.id);
      }
    } else {
      return res.status(404).json({ msg: 'Invalid object id' });
    }
    // const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const usersPromiseArray = project.users.map(async user => {
      const userName = await User.findById(new ObjectId(user)).select(
        '-password'
      );
      // returns null if no user
      return userName;
    });

    const userData = await Promise.all(usersPromiseArray);

    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/project/:id/users
// @desc    add a user / users to a project
// @access  Private
router.put('/:id/users', auth, async (req, res) => {
  try {
    const newUserId = new ObjectId(req.body.userId);

    let project;
    // Check if the id is a 12 char string
    if (ObjectId.isValid(req.params.id)) {
      const newObjectId = new ObjectId(req.params.id).toString();
      if (newObjectId === req.params.id) {
        project = await Project.findById(req.params.id);
      }
    } else {
      return res.status(404).json({ msg: 'Invalid object id' });
    }

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.users.includes(newUserId)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User is already in this project' }] });
    }

    project.users = [...project.users, newUserId];

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/project/:id/setProjectName
// @desc    udpate a project's name by id
// @access  Private
router.put('/:id/name', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    const { name } = req.body;

    project.name = name;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
