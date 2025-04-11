import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap';
import axios from 'axios';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    location: ''
  });

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setSelectedEvent(null);
      setFormData({
        title: '',
        description: '',
        start: '',
        end: '',
        location: ''
      });
    }
  };

  const handleSelect = ({ start, end }) => {
    setFormData({
      ...formData,
      start: format(start, "yyyy-MM-dd'T'HH:mm"),
      end: format(end, "yyyy-MM-dd'T'HH:mm")
    });
    toggle();
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start: format(new Date(event.start), "yyyy-MM-dd'T'HH:mm"),
      end: format(new Date(event.end), "yyyy-MM-dd'T'HH:mm"),
      location: event.location || ''
    });
    toggle();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedEvent) {
        await axios.put(`http://localhost:5000/api/events/${selectedEvent._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/events', formData);
      }
      fetchEvents();
      toggle();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${selectedEvent._id}`);
        fetchEvents();
        toggle();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
      />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {selectedEvent ? 'Edit Event' : 'Add Event'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="start">Start Time</Label>
              <Input
                type="datetime-local"
                name="start"
                id="start"
                value={formData.start}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="end">End Time</Label>
              <Input
                type="datetime-local"
                name="end"
                id="end"
                value={formData.end}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {selectedEvent ? 'Update' : 'Save'}
          </Button>
          {selectedEvent && (
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default EventCalendar;
