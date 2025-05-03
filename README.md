# File Drag And Drop Component

## Props

### `acceptFileExtension` (Optional)
- Type: `string[]`
- Description: List of valid file extensions to be allowed.

### `onInvalidFile` (Required)
- Type: `Function`
- Description: Callback function called when the file extension is not found in `acceptFileExtension`.

### `onFileUpload` (Required)
- Type: `Function`
- Description: Callback function called when a file is successfully uploaded.

### `acceptFileType` (Optional)
- Type: `string`
- Description: Valid file types for the input file accept attribute.

### `DNDTitle` (Optional)
- Type: `string`
- Description: Title inside the dropbox.

### `DNDTitleHTML` (Optional)
- Type: `HTMLElement`
- Description: Custom HTML for the dropbox title.

### `numberOfFiles` (Optional)
- Type: `number`
- Description: Maximum number of files allowed to be uploaded. Default is 5

### `ImageProps` (Optional)
- Type: `object`
- Description: Includes image properties like `src`, `width`, `height`, etc.

### `FaIconProps` (Optional)
- Type: `import('@fortawesome/react-fontawesome').FontAwesomeIconProps`
- Description: FontAwesome icon properties like `icon`, `fontSize`, `class`, etc.

## Example Usage

```jsx
import DragAndDrop from 'react-files-drag-drop';

const MyComponent = () => {
  const handleInvalidFile = (msg) => {
    // handle invalid file
  };

  const handleFileUpload = (file) => {
    // handle file upload
  };

  return (
    <DragAndDrop
      acceptFileExtension={['jpg', 'png', 'pdf']}
      onInvalidFile={handleInvalidFile}
      onFileUpload={handleFileUpload}
      acceptFileType="image/*"
      DNDTitle="Drag and Drop Files Here"
      numberOfFiles={3}
      ImageProps={{ src: 'path/to/image', width: 50, height: 50 }}
      FaIconProps={{ icon: 'file', fontSize: '2x', class: 'custom-icon' }}
    />
  );
};
