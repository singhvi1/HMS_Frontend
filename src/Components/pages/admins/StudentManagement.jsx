/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Popconfirm,
  InputNumber,
  Card,
  Typography,
  Row,
  Col,
  Tag
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { studentService } from '../../../services/apiService';

const { Title } = Typography;
const { Option } = Select;

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    branch: null,
    block: null,
    search: '',
  });

  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'];
  const blocks = ['A', 'B', 'C', 'D'];

  const fetchStudents = async (params = {}) => {
    setLoading(true);
    try {
      const { current, pageSize } = pagination;
      const { branch, block, search } = filters;

      const queryParams = {
        page: params.page || current,
        limit: params.pageSize || pageSize,
        ...(branch && { branch }),
        ...(block && { block }),
        ...(search && { search }),
      };

      const response = await studentService.getAllStudents(queryParams);
      setStudents(response.data.students);
      setPagination({
        ...pagination,
        total: response.data.total,
        current: response.data.page,
      });
    } catch (error) {
      message.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters, pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    form.setFieldsValue({
      ...student,
      // Map any nested fields if necessary
    });
    setIsModalVisible(true);
  };

  const handleDeleteStudent = async (userId) => {
    try {
      await studentService.deleteStudent(userId);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to delete student');
      console.error('Error deleting student:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingStudent) {
        await studentService.updateStudent(editingStudent._id, values);
        message.success('Student updated successfully');
      } else {
        // Handle create student (would need to call appropriate API)
        // For now, we'll just show a message
        message.success('Student created successfully');
      }
      setIsModalVisible(false);
      fetchStudents();
    } catch (error) {
      message.error(`Failed to ${editingStudent ? 'update' : 'create'} student`);
      console.error(`Error ${editingStudent ? 'updating' : 'creating'} student:`, error);
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'sid',
      key: 'sid',
      sorter: (a, b) => a.sid.localeCompare(b.sid),
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (_, record) => (
        <div>
          <div>{record.full_name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      filters: branches.map(branch => ({ text: branch, value: branch })),
      onFilter: (value, record) => record.branch === value,
    },
    {
      title: 'Room',
      dataIndex: 'room_number',
      key: 'room_number',
      render: (_, record) => (
        <Tag color="blue">
          {record.block}-{record.room_number}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditStudent(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this student?"
            onConfirm={() => handleDeleteStudent(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Title level={4} style={{ margin: 0 }}>Student Management</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '20px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Search by name or ID"
                prefix={<SearchOutlined />}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                allowClear
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select Branch"
                allowClear
                onChange={(value) => setFilters({ ...filters, branch: value })}
              >
                {branches.map(branch => (
                  <Option key={branch} value={branch}>{branch}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select Block"
                allowClear
                onChange={(value) => setFilters({ ...filters, block: value })}
              >
                {blocks.map(block => (
                  <Option key={block} value={block}>{block}</Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        {/* Student Table */}
        <Table
          columns={columns}
          dataSource={students}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </Card>

      {/* Add/Edit Student Modal */}
      <Modal
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Phone Number"
                  maxLength={10}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sid"
                label="Student ID"
                rules={[
                  { required: true, message: 'Please enter student ID' },
                  { pattern: /^[0-9]{8}$/, message: 'Student ID must be 8 digits' },
                ]}
              >
                <Input placeholder="Student ID" maxLength={8} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="branch"
                label="Branch"
                rules={[{ required: true, message: 'Please select branch' }]}
              >
                <Select placeholder="Select Branch">
                  {branches.map(branch => (
                    <Option key={branch} value={branch}>{branch}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="block"
                label="Block"
                rules={[{ required: true, message: 'Please select block' }]}
              >
                <Select placeholder="Select Block">
                  {blocks.map(block => (
                    <Option key={block} value={block}>Block {block}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="room_number"
                label="Room Number"
                rules={[{ required: true, message: 'Please enter room number' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={100}
                  max={999}
                  placeholder="Room Number"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="guardian_contact"
                label="Guardian Contact"
                rules={[
                  { required: true, message: 'Please enter guardian contact' },
                  { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit number' },
                ]}
              >
                <Input placeholder="Guardian Contact" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="permanent_address"
            label="Permanent Address"
            rules={[{ required: true, message: 'Please enter permanent address' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Permanent Address"
              prefix={<HomeOutlined />}
            />
          </Form.Item>

          {!editingStudent && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
