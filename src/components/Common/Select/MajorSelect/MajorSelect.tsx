import { ChangeEvent } from 'react';
import { Select } from '@chakra-ui/react';
import { EMajor } from 'lib/enum/majors';
import { IAuthOption, majors } from 'lib/models/menu/authOption';

interface MajorSelectProps {
  major: EMajor;
  onChangeMajor: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const MajorSelect = ({
  major,
  onChangeMajor,
}: MajorSelectProps): JSX.Element => {
  return (
    <Select
      name='major'
      value={major}
      onChange={onChangeMajor}
    >
      {
        majors.map(({ text, value }: IAuthOption) => (
          <option
            key={value}
            value={value}
          >
            {text}
          </option>
        ))
      }
    </Select>
  );
};

export default MajorSelect;
