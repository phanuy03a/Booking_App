import {
  faChildren,
  faLocationDot,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import DateRangePicker from 'components/ux/data-range-picker/DateRangePicker';
import Input from 'components/ux/input/Input';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { networkAdapter } from 'services/NetworkAdapter';
/**
 * GlobalSearchBox Component
 * Renders a search box with input fields for location, number of guests, and a date range picker.
 * It includes a search button to trigger the search based on the entered criteria.
 *
 * @param {Object} props - Props for the component.
 * @param {string} props.locationInputValue - The current value of the location input.
 * @param {string} props.numGuestsInputValue - The current value of the number of guests input.
 * @param {boolean} props.isDatePickerVisible - Flag to control the visibility of the date picker.
 * @param {Function} props.onLocationChangeInput - Callback for location input changes.
 * @param {Function} props.onNumGuestsInputChange - Callback for number of guests input changes.
 * @param {Function} props.onDatePickerIconClick - Callback for the date picker icon click event.
 * @param {Array} props.locationTypeheadResults - Results for the location input typeahead.
 * @param {Function} props.onSearchButtonAction - Callback for the search button click event.
 * @param {Function} props.onDateChangeHandler - Callback for handling date range changes.
 * @param {Function} props.setisDatePickerVisible - Callback to set the visibility state of the date picker.
 * @param {Object} props.dateRange - The selected date range.
 */
const GlobalSearchBox = (props) => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchcity = async () => {
      const cityData = await networkAdapter.get('/api/misc/city');
      if (cityData && cityData.data) {
        console.log('cityData', cityData.data);
        const mappedValues = cityData.data.elements.map((country) => ({
          label: country.name,
          value: country.name,
        }));
        setCity(mappedValues);
      }
    };
    fetchcity();
  }, []);

  const {
    locationInputValue,
    numGuestsInputValue,
    isDatePickerVisible,
    onLocationChangeInput,
    onNumGuestsInputChange,
    onDatePickerIconClick,
    locationTypeheadResults,
    onSearchButtonAction,
    onDateChangeHandler,
    setisDatePickerVisible,
    dateRange,
  } = props;
  return (
    <Row className="align-items-end justify-content-end">
      <Col xs={2} className="px-0">
          <Select
            options={city}
            className="stay-booker__input w-full capitalize spaces border-end-0"
            placeholder="Chọn khu vực"
          />
      </Col>
      <Col xs={2} className="px-0">
          <Select
            options={city}
            className="stay-booker__input w-full capitalize spaces border-end-0"
            placeholder="Chọn khách sạn"
          />
      </Col>
      <Col xs={3} className="px-0">
        <DateRangePicker
          isDatePickerVisible={isDatePickerVisible}
          onDatePickerIconClick={onDatePickerIconClick}
          onDateChangeHandler={onDateChangeHandler}
          setisDatePickerVisible={setisDatePickerVisible}
          dateRange={dateRange}
        />
      </Col>
      <Col xs={2} className="px-0">
        <div className="d-flex">
          <Input
            size="sm"
            value={numGuestsInputValue}
            onChangeInput={onNumGuestsInputChange}
            placeholder="Người lớn"
            icon={faPerson}
            classes='border-end-0 border-start-0'
          />
          <Input
            size="sm"
            value={numGuestsInputValue}
            onChangeInput={onNumGuestsInputChange}
            placeholder="Trẻ em"
            className="flex-2"
            icon={faChildren}
          />
        </div>
      </Col>
      <Col xs={2} className="px-1">
        <button
          className=" w-full md:w-auto sb__button--secondary bg-brand-secondary hover:bg-yellow-600 py-7 spaces px-16 text-white"
          onClick={onSearchButtonAction}
        >
          Tìm kiếm
        </button>
      </Col>
    </Row>
  );
};

export default GlobalSearchBox;
