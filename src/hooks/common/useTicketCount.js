const useTicketCount = (tickets, type) => {
  let count = 0;
  switch (type) {
    case 'rejected':
      tickets.map((item) => {
        if (item?.entryStatus.substring(0, 6) === 'Reject') {
          count = count + 1;
        }
      });
      break;
    case 'allocated':
      tickets.map((item) => {
        if (item.isAllocated) {
          count = count + 1;
        }
      });
      break;
    case 'unAllocated':
      tickets.map((item) => {
        if (!item.isAllocated) {
          count = count + 1;
        }
      });
      break;
    case 'notPresent':
      tickets.map((item) => {
        if (item.entryStatus === 'NotPresent') {
          count = count + 1;
        }
      });
      break;
    case 'checkedOut':
      tickets.map((item) => {
        if (item.entryStatus === 'CheckedOut') {
          count = count + 1;
        }
      });
      break;
    case 'checkedIn':
      tickets.map((item) => {
        if (item.entryStatus === 'CheckedIn') {
          count = count + 1;
        }
      });
      break;
    case 'assignmentValidation':
      tickets.map((item) => {
        if (item.assignmentValidation) {
          count = count + 1;
        }
      });
      break;
    case 'kycIncomplete':
      tickets.map((item) => {
        if (item?.assignmentValidation?.errorCode === 'IncompleteKyc') {
          count = count + 1;
        }
      });
      break;
    case 'assignmentValidationIndex':
      tickets.map((item, index) => {
        if (item.assignmentValidation) {
          count = index;
        } else {
          count = -1;
        }
      });
      break;

    default:
      break;
  }

  return count;
};
export default useTicketCount;
