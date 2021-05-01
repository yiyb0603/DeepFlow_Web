import { ChangeEvent, memo } from 'react';
import { Select } from '@chakra-ui/react';
import { generations } from 'lib/models/menu/authOption';

interface GenerationSelectProps {
  generation: number;
  onChangeGeneration: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const GenerationSelect = ({
  generation,
  onChangeGeneration,
}: GenerationSelectProps): JSX.Element => {
  return (
    <Select
      value={generation}
      onChange={onChangeGeneration}
    >
      {
        generations.map((_: unknown, idx: number) => (
          <option
            key={idx}
            value={idx + 1}
          >
            {idx + 1}기
          </option>
        ))
      }
    </Select>
  );
};

export default memo(GenerationSelect);
