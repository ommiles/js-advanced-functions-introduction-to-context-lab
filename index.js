const createEmployeeRecord = (testEmployee) =>  {
    const recordObject = {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return recordObject 
}

const createEmployeeRecords = (dataEmployees) => {
    const newRecordsList = []
    dataEmployees.forEach(element => {
        newRecordsList.push(createEmployeeRecord(element))
    });
    return newRecordsList
}

const createTimeInEvent = (employeeRecordObj, dateStamp) => {
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10) 
    }
    employeeRecordObj.timeInEvents.push(timeInObj) 
    return employeeRecordObj
}

const createTimeOutEvent = (employeeRecordObj, dateStamp) => {
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)), 
        date: dateStamp.slice(0, 10) 
    }
    employeeRecordObj.timeOutEvents.push(timeOutObj)
    return employeeRecordObj
}

const hoursWorkedOnDate = (employeeRecordObj, dateStamp) => {
    const timeInObj = employeeRecordObj.timeInEvents.find(element => element.date === dateStamp)
    const timeOutObj = employeeRecordObj.timeOutEvents.find(element => element.date === dateStamp)

    return (timeOutObj.hour - timeInObj.hour)/100
}

const wagesEarnedOnDate = (employeeRecordObj, dateStamp) => {
    let payOwed = hoursWorkedOnDate (employeeRecordObj, dateStamp)
    return payOwed * employeeRecordObj.payPerHour
}

const allWagesFor = (employeeRecordObj) => {
    let allDatesWorked = []

    employeeRecordObj.timeInEvents.forEach(dayWorked => {
        allDatesWorked.push(dayWorked.date)
    })

    let total = 0

    for (const dateStamp of allDatesWorked) {
        total += wagesEarnedOnDate(employeeRecordObj, dateStamp)
    }
    return total
}

const findEmployeeByFirstName = (ArrOfEmployeeObject, firstName) => {
    return ArrOfEmployeeObject.find(employee => firstName === employee.firstName)
}

const calculatePayroll = (ArrOfEmployeeObject) => {
    let totalWages = 0
    ArrOfEmployeeObject.forEach(element => {
        totalWages = totalWages + allWagesFor(element)
    })
    return totalWages
}