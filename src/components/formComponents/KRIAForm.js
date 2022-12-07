import React, { useEffect, useState } from 'react';

import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Space,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { Card, Col, Row } from 'react-bootstrap';
import CustomCardLoader from './CustomCardLoader';
import dataService from '../services/dataService';
import { IconCheck, IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons';
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import CustomLoader from './CustomLoader';
import actionLogsService from '../services/actionLogsService';
import { check_roles } from '../utils/Utils';

const ActionLogTasks = ({ action_log_id, action_log_data, user }) => {
  const [pendingTasks, setPendingTasks] = useState();
  const [completedTasks, setCompletedTasks] = useState();

  const getPendingTasksApi = () => {
    setPendingTasks();
    dataService.toDoPending(action_log_id).then((res) => {
      if (res?.data?.success) setPendingTasks(res?.data?.data);
    });
  };

  const getCompletedTasksApi = () => {
    setCompletedTasks();
    dataService.toDoCompleted(action_log_id).then((res) => {
      if (res?.data?.success) setCompletedTasks(res?.data?.data);
    });
  };

  useEffect(() => {
    getPendingTasksApi();
    getCompletedTasksApi();
  }, []);

  const priorities = [
    {
      label: 'High',
      value: 'High',
    },
    {
      label: 'Medium',
      value: 'Medium',
    },
    {
      label: 'Low',
      value: 'Low',
    },
  ];

  const updateTaskCriticality = (task, data, setTasks) => {
    setTasks((current) =>
      current.map((obj) => {
        if (obj.id === task?.id) {
          return { ...obj, ...data };
        }

        return obj;
      }),
    );
  };

  const addTask = (task, setTasks) => {
    setTasks((current) => [task, ...current]);
  };

  const removeTask = (task, setTasks) => {
    setTasks((current) =>
      current.filter((obj) => {
        return obj.id !== task?.id;
      }),
    );
  };

  const updateTaskCriticalityApi = (task, criticality, setTasks) => {
    dataService.updateCriticalityToDoListItem(action_log_id, task.id, criticality).then((res) => {
      console.log(res);
      if (res?.data?.success) updateTaskCriticality(task, { criticality: criticality }, setTasks);
    });
  };

  const savePendingTaskApi = (task, data, setTasks) => {
    dataService.saveActionLogTask(action_log_id, { ...task, ...data }).then((res) => {
      if (res?.data?.success) console.log('success');
    });
  };

  //   const updateCompletedTaskCriticality = (task, criticality) => {
  //     dataService.updateCriticalityToDoListItem(action_log_id, task.id, criticality).then((res) => {
  //       console.log(res);
  //       if (res?.data?.success) updateTaskCriticality(task, criticality, setCompletedTasks);
  //     });
  //   };

  const [showSaveTaskModal, setShowSaveTaskModal] = useState(false);
  const [showSaveTaskModalLoader, setShowSaveTaskModalLoader] = useState(false);
  const [saveTaskModalActivePage, setSaveTaskModalActivePage] = useState(1);
  const [saveTaskModalMessage, setSaveTaskModalMessage] = useState();
  const [taskForEdit, setTaskForEdit] = useState();

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showDeleteTaskModalLoader, setShowDeleteTaskModalLoader] = useState(false);
  const [deleteTaskModalActivePage, setDeleteTaskModalActivePage] = useState(1);
  const [deleteTaskModalMessage, setDeleteTaskModalMessage] = useState();
  const [taskForDelete, setTaskForDelete] = useState();

  const formik = useFormik({
    initialValues: {
      id: taskForEdit?.id,
      description: taskForEdit?.description,
      completed: taskForEdit?.completed,
      criticality: taskForEdit?.criticality,
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.description) errors.description = 'Field is required';
      if (!values.criticality) errors.criticality = 'Priority is required';

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      setShowSaveTaskModalLoader(true);
      dataService.saveActionLogTask(action_log_id, values).then((res) => {
        setSubmitting(false);
        setShowSaveTaskModalLoader(false);
        setSaveTaskModalActivePage(2);
        setSaveTaskModalMessage(res?.data?.data);
      });
    },
  });

  const saveTaskModalCleanup = () => {
    formik.resetForm();
    setTaskForEdit();
    setShowSaveTaskModal(false);
    setShowSaveTaskModalLoader(false);
    setSaveTaskModalMessage();
    setSaveTaskModalActivePage(1);
  };

  const deleteTaskModalCleanup = () => {
    formik.resetForm();
    setTaskForDelete();
    setShowDeleteTaskModal(false);
    setShowDeleteTaskModalLoader(false);
    setDeleteTaskModalMessage();
    setDeleteTaskModalActivePage(1);
  };

  const deleteTaskApi = (data) => {
    actionLogsService.deleteTask({ ...data, action_log_id: action_log_id }).then((res) => {
      setShowDeleteTaskModalLoader(false);
      setDeleteTaskModalMessage(res?.data?.data);
      setDeleteTaskModalActivePage(2);
    });
  };

  const DeleteTaskModal = () => {
    return (
      <Modal
        radius={'lg'}
        size="lg"
        opened={showDeleteTaskModal}
        centered
        title={<Text weight={700} className="golden-text">{`Remove Task`}</Text>}
        onClose={() => {
          deleteTaskModalCleanup();
        }}
        onLoad={() => {
          setShowDeleteTaskModalLoader(false);
          setDeleteTaskModalActivePage(1);
          setDeleteTaskModalMessage();
        }}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        {!showDeleteTaskModalLoader && deleteTaskModalActivePage === 1 && (
          <>
            <Row>
              <Col xs={12}>
                <Text>{`Are you sure you want to delete the task - ${taskForDelete?.description}?`}</Text>
              </Col>
            </Row>
            <Space h="xl" />
            <Group position="right">
              <Button
                color="gray"
                radius="xl"
                leftIcon={<IconX size={16} color="white" />}
                onClick={() => {
                  deleteTaskModalCleanup();
                }}
              >{`Cancel`}</Button>
              <Button
                color="yellow"
                radius="xl"
                leftIcon={<IconCheck size={16} color="white" />}
                onClick={() => {
                  setShowDeleteTaskModalLoader(true);
                  deleteTaskApi(taskForDelete);
                }}
              >{`Delete`}</Button>
            </Group>
          </>
        )}

        {!showDeleteTaskModalLoader && deleteTaskModalActivePage === 2 && (
          <>
            <Group>
              <Text align="left" weight={500}>
                {deleteTaskModalMessage}
              </Text>
            </Group>

            <Space h="xl" />
            <Group position="right">
              <Button
                color="yellow"
                radius="xl"
                leftIcon={<IconCheck size={16} color="white" />}
                onClick={() => {
                  if (taskForEdit?.completed) getCompletedTasksApi();
                  else getPendingTasksApi();
                  deleteTaskModalCleanup();
                }}
              >{`OK`}</Button>
            </Group>
          </>
        )}

        {showDeleteTaskModalLoader ? <CustomLoader /> : null}
      </Modal>
    );
  };

  return (
    <>
      <Modal
        radius={'lg'}
        size="lg"
        opened={showSaveTaskModal}
        centered
        title={
          <Text weight={700} className="golden-text">
            {taskForEdit ? `Modify Task` : `Create Task`}
          </Text>
        }
        onClose={() => {
          saveTaskModalCleanup();
        }}
        onLoad={() => {
          setShowSaveTaskModalLoader(false);
          setSaveTaskModalActivePage(1);
          setSaveTaskModalMessage();
        }}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        {!showSaveTaskModalLoader && saveTaskModalActivePage === 1 && (
          <>
            <Row>
              <Col xs={12} sm={6}>
                <TextInput
                  label="Task"
                  name="description"
                  placeholder="Describe the task"
                  required
                  radius={'lg'}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={formik.errors.description}
                  disabled={formik.isSubmitting}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Select
                  label="Priority of task"
                  name="criticality"
                  placeholder="Priority of the task"
                  required
                  data={priorities}
                  radius={'lg'}
                  value={formik.values.criticality}
                  onChange={(e) => {
                    formik.setFieldValue('criticality', e);
                  }}
                  error={formik.errors.criticality}
                  maxDropdownHeight={400}
                  disabled={formik.isSubmitting}
                />
              </Col>
            </Row>
            <Space h="xl" />
            <Group position="right">
              <Button
                color="gray"
                radius="xl"
                leftIcon={<IconX size={16} color="white" />}
                onClick={() => {
                  saveTaskModalCleanup();
                }}
              >{`Cancel`}</Button>
              <Button
                color="yellow"
                radius="xl"
                leftIcon={<IconCheck size={16} color="white" />}
                onClick={formik.handleSubmit}
              >{`Save`}</Button>
            </Group>
          </>
        )}

        {!showSaveTaskModalLoader && saveTaskModalActivePage === 2 && (
          <>
            <Group>
              <Text align="left" weight={500}>
                {saveTaskModalMessage}
              </Text>
            </Group>

            <Space h="xl" />
            <Group position="right">
              <Button
                color="yellow"
                radius="xl"
                leftIcon={<IconCheck size={16} color="white" />}
                onClick={() => {
                  if (taskForEdit?.completed) getCompletedTasksApi();
                  else getPendingTasksApi();
                  saveTaskModalCleanup();
                }}
              >{`OK`}</Button>
            </Group>
          </>
        )}

        {showSaveTaskModalLoader ? <CustomLoader /> : null}
      </Modal>
      <DeleteTaskModal />
      <Card>
        <Card.Body>
          <Group position="apart">
            <Text size="lg" weight={700} color="yellow" align="left">{`Tasks`}</Text>
            {check_roles(user, ['admin']) ||
            user?.user_id == action_log_data?.po_id ||
            user?.user_id == action_log_data?.secondary_po_id ? (
              isMobile ? (
                <ActionIcon
                  variant="filled"
                  onClick={() => {
                    setShowSaveTaskModal(true);
                  }}
                  color={'yellow'}
                  radius="xl"
                  size="lg"
                >
                  <IconPlus size={16} color="black" />
                </ActionIcon>
              ) : (
                <Button
                  radius="xl"
                  color={'yellow'}
                  leftIcon={<IconPlus size={14} color="white" />}
                  onClick={() => {
                    setShowSaveTaskModal(true);
                  }}
                >{`Add`}</Button>
              )
            ) : null}
          </Group>
        </Card.Body>
        <Card.Body>
          <Group position="apart">
            <SimpleGrid cols={1}>
              <Text size="lg" weight={700} color="yellow" align="left">{`Pending Tasks`}</Text>
              <Text
                size="sm"
                color="gray"
                align="left"
              >{`See your pending tasks for this action log here`}</Text>
            </SimpleGrid>
          </Group>
        </Card.Body>
        {!pendingTasks && <CustomCardLoader />}
        {pendingTasks && pendingTasks.length === 0 && (
          <Card.Body>
            <Group position="center">
              <Text>{`There are no pending tasks for this action log.`}</Text>
            </Group>
          </Card.Body>
        )}
        {pendingTasks && pendingTasks.length > 0 && (
          <div className="table-responsive" style={{ maxHeight: '20vh' }}>
            <Table className="table card-table text-wrap table-vcenter card-table">
              <tbody>
                {pendingTasks.map((task) => (
                  <>
                    <tr key={task.id}>
                      <td>
                        <Checkbox
                          checked={task?.completed}
                          color={'yellow'}
                          label={<Text align="left">{task?.description}</Text>}
                          key={task?.id}
                          onClick={() => {
                            removeTask(task, setPendingTasks);
                            addTask(task, setCompletedTasks);

                            updateTaskCriticality(task, { completed: true }, setCompletedTasks);

                            savePendingTaskApi(task, { completed: true }, setCompletedTasks);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        />
                      </td>
                      <td>
                        <Select
                          name="priority"
                          placeholder="Priority"
                          data={priorities}
                          radius={'lg'}
                          onChange={(value) => {
                            updateTaskCriticalityApi(task, value, setPendingTasks);
                          }}
                          value={task?.criticality}
                          maxDropdownHeight={400}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        />
                      </td>
                      <td>
                        <ActionIcon
                          onClick={() => {
                            setTaskForEdit(task);
                            setShowSaveTaskModal(true);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        >
                          <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                      </td>
                      <td>
                        <ActionIcon
                          color="red"
                          onClick={() => {
                            setTaskForDelete(task);
                            setShowDeleteTaskModal(true);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        >
                          <IconTrash size={16} stroke={1.5} />
                        </ActionIcon>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {/* {pendingTasks && pendingTasks.length > 0 && (
        <Card.Body style={{ maxHeight: '20vh', overflowY: 'scroll' }}>
          <Row>
            <Col xs={12}>
              {pendingTasks.map((task) => (
                <>
                  <Transition
                    mounted={true}
                    transition={'fade'}
                    duration={3000}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <div
                        style={{
                          ...styles,
                        }}
                      >
                        <Row style={{ paddingBottom: '0.5rem' }}>
                          <Col xs={12}>
                            <Group position="apart">
                              <Checkbox
                                checked={task?.completed}
                                color={'yellow'}
                                label={task?.description}
                                key={task?.id}
                                onClick={() => {
                                  removeTask(task, setPendingTasks);
                                  addTask(task, setCompletedTasks);

                                  updateTaskCriticality(
                                    task,
                                    { completed: true },
                                    setCompletedTasks,
                                  );

                                  savePendingTaskApi(task, { completed: true }, setCompletedTasks);
                                }}
                              />
                              <Select
                                name="priority"
                                placeholder="Priority"
                                data={priorities}
                                radius={'lg'}
                                onChange={(value) => {
                                  updateTaskCriticalityApi(task, value, setPendingTasks);
                                }}
                                value={task?.criticality}
                                maxDropdownHeight={400}
                              />
                            </Group>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Transition>
                </>
              ))}
            </Col>
          </Row>
        </Card.Body>
      )} */}
        <Card.Body>
          <Group position="apart">
            <SimpleGrid cols={1}>
              <Text size="lg" weight={700} color="yellow" align="left">{`Completed Tasks`}</Text>
              <Text
                size="sm"
                color="gray"
                align="left"
              >{`See your completed tasks for this action log here`}</Text>
            </SimpleGrid>
          </Group>
        </Card.Body>
        {!completedTasks && <CustomCardLoader />}
        {completedTasks && completedTasks.length === 0 && (
          <Card.Body>
            <Group position="center">
              <Text>{`There are no completed tasks for this action log.`}</Text>
            </Group>
          </Card.Body>
        )}
        {/* {completedTasks && completedTasks.length > 0 && (
        <Card.Body style={{ maxHeight: '20vh', overflowY: 'scroll' }}>
          <Row>
            <Col xs={12}>
              {completedTasks.map((task) => (
                <>
                  <Row style={{ paddingBottom: '0.5rem' }}>
                    <Col xs={12}>
                      <Group position="apart">
                        <Checkbox
                          checked={task?.completed}
                          color={'yellow'}
                          label={task?.description}
                          key={task?.id}
                          onClick={() => {
                            removeTask(task, setCompletedTasks);
                            addTask(task, setPendingTasks);

                            updateTaskCriticality(task, { completed: false }, setPendingTasks);

                            savePendingTaskApi(task, { completed: false }, setPendingTasks);
                          }}
                        />
                        <Select
                          name="priority"
                          placeholder="Priority"
                          data={priorities}
                          radius={'lg'}
                          onChange={(value) => {
                            updateTaskCriticalityApi(task, value, setCompletedTasks);
                          }}
                          value={task?.criticality}
                          maxDropdownHeight={400}
                        />
                      </Group>
                    </Col>
                  </Row>
                </>
              ))}
            </Col>
          </Row>
        </Card.Body>
      )} */}
        {completedTasks && completedTasks.length > 0 && (
          <div className="table-responsive" style={{ maxHeight: '20vh' }}>
            <Table className="table card-table text-wrap table-vcenter card-table">
              <tbody>
                {completedTasks.map((task) => (
                  <>
                    <tr key={task.id}>
                      <td>
                        <Checkbox
                          checked={task?.completed}
                          color={'yellow'}
                          label={<Text align="left">{task?.description}</Text>}
                          key={task?.id}
                          onClick={() => {
                            removeTask(task, setCompletedTasks);
                            addTask(task, setPendingTasks);

                            updateTaskCriticality(task, { completed: false }, setPendingTasks);

                            savePendingTaskApi(task, { completed: false }, setPendingTasks);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        />
                      </td>
                      <td>
                        <Select
                          name="priority"
                          placeholder="Priority"
                          data={priorities}
                          radius={'lg'}
                          onChange={(value) => {
                            updateTaskCriticalityApi(task, value, setCompletedTasks);
                          }}
                          value={task?.criticality}
                          maxDropdownHeight={400}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        />
                      </td>
                      <td>
                        <ActionIcon
                          onClick={() => {
                            setTaskForEdit(task);
                            setShowSaveTaskModal(true);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        >
                          <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                      </td>
                      <td>
                        <ActionIcon
                          color="red"
                          onClick={() => {
                            setTaskForDelete(task);
                            setShowDeleteTaskModal(true);
                          }}
                          disabled={
                            !check_roles(user, ['admin']) &&
                            !(
                              user?.user_id == action_log_data?.po_id ||
                              user?.user_id == action_log_data?.secondary_po_id
                            )
                          }
                        >
                          <IconTrash size={16} stroke={1.5} />
                        </ActionIcon>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </>
  );
};

export default ActionLogTasks;
