import XLSPrinter from "~/server/utils/XlsPrinter";

export default defineEventHandler(async (event) => {
    const body = readBody(event);
    const name = "John Doe"; // Example value for name
    const position = "Software Engineer"; // Example value for position
    const periodCovered = "2021-01-01 to 2021-12-31"; // Example value for periodCovered
    const reportItems = ["Item 1", "Item 2", "Item 3"]; // Example value for reportItems

    const excelData = {
        name,
        position,
        periodCovered,
        war: reportItems
    };
    const warResult = await XLSPrinter.print("/war-template.xlsx", excelData)
    console.log('warResult :>> ', warResult);

    return warResult;
});
