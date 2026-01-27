import { format } from "date-fns-tz";
import { compareAsc, parse } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR/index.js";

export default class FormatDatesFront {
  getDateNoHour() {
    // ! - Formatando a data para o formato 'DD-MM-YYYY'

    const data = new Date();
    return format(data, "dd/MM/yyyy");
  }

  getDateNow() {
    try {
      const data = new Date();

      return format(data, "yyyy-MM-dd");
    } catch (err) {
      return err;
    }
  }

  getDateWithHour() {
    // ! - Formatando a data para o formato 'DD-MM-YYYY e HH:mm'

    const data = new Date();

    return format(data, "dd/MM/yyyy - HH:mm:ss");
  }

  getYear() {
    // ! - Formatando a data para o formato 'DD-MM-YYYY e HH:mm'
    try {
      const data = new Date();

      const formatDate = format(data, "yyyy");

      return formatDate;
    } catch (err) {
      return err;
    }
  }
  getMonth() {
    // ! - Formatando a data para o formato 'DD-MM-YYYY e HH:mm'
    try {
      const data = new Date();

      const formatDate = format(data, "MM");

      return formatDate;
    } catch (err) {
      return err;
    }
  }

  formatDateNoHour(dateString) {
    if (dateString.length > 0) {
      const organizeDate = parse(dateString, "dd/MM/yyyy", new Date(), {
        timeZone: "America/Sao_Paulo",
      });

      const formatDate = format(organizeDate, "yyyy-MM-dd");

      return formatDate;
    }
  }
  formatDateWithHour(dateString) {
    const organizeDate = parse(dateString, "dd/MM/yyyy - HH:mm", new Date(), {
      timeZone: "America/Sao_Paulo",
    });

    const formatDate = format(organizeDate, "yyyy-MM-dd");

    return formatDate;
  }
  formatDateWithHourDolar(dateString) {
    const organizeDate = parse(
      dateString,
      "dd/MM/yyyy - HH:mm:ss",
      new Date(),
      {
        timeZone: "America/Sao_Paulo",
      }
    );

    const formatDate = format(organizeDate, "yyyy-MM-dd");

    return formatDate;
  }

  formatDateZeroHour(dateString) {
    const organizeDate = parse(dateString, "dd/MM/yyyy - HH:mm", new Date(), {
      timeZone: "America/Sao_Paulo",
    });

    const formatDate = format(organizeDate, "dd/MM/yyyy");

    return formatDate;
  }

  formatDateInput(dateString) {
    const organizeDate = parse(dateString, "yyyy-MM-dd", new Date(), {
      timeZone: "America/Sao_Paulo",
    });

    const formatDate = format(organizeDate, "dd/MM/yyyy");

    return formatDate;
  }

  compareDatesAfter(dateFirst, dateSecond) {
    try {
      const organizeDate = this.formatDateInput(dateSecond);
      let dateBefore;
      if (dateFirst.length === 18) {
        dateBefore = parse(dateFirst, "dd/MM/yyyy - HH:mm", new Date(), {
          timeZone: "America/Sao_Paulo",
        });
      } else {
        dateBefore = parse(dateFirst, "dd/MM/yyyy", new Date(), {
          timeZone: "America/Sao_Paulo",
        });
      }

      const dateAfter = parse(organizeDate, "dd/MM/yyyy", new Date(), {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      const compareDates = compareAsc(dateBefore, dateAfter);

      return compareDates;
    } catch (err) {
      return err;
    }
  }

  compareDatesAfterWithHour(firstDate, secondDate) {
    try {
      const organizeSecondDate = this.formatDateInput(secondDate);

      const organizeFirstDate = this.formatDateZeroHour(firstDate);

      const dateBefore = parse(organizeFirstDate, "dd/MM/yyyy", new Date(), {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      const dateAfter = parse(organizeSecondDate, "dd/MM/yyyy", new Date(), {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      const compareDates = compareAsc(dateBefore, dateAfter);

      return compareDates;
    } catch (err) {
      return err;
    }
  }
  compareDatesDolar(firstDate, secondDate) {
    try {
      const organizeSecondDate = this.formatDateWithHourDolar(secondDate);

      const organizeFirstDate = this.formatDateWithHourDolar(firstDate);

      const dateBefore = parse(organizeFirstDate, "yyyy-MM-dd", new Date(), {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      const dateAfter = parse(organizeSecondDate, "yyyy-MM-dd", new Date(), {
        timeZone: "America/Sao_Paulo",
        locale: ptBR,
      });

      const compareDates = compareAsc(dateBefore, dateAfter);

      return compareDates;
    } catch (err) {
      return err;
    }
  }

  // compareMonthDates(firstMonth, secondMonth) {
  //   const fixedDay = 1;

  //   const formatFirstMonth = parse(firstMonth, "MM/yyyy", new Date(), {
  //     timeZone: "America/Sao_Paulo",
  //   });
  //   const formatSecondMonth = parse(secondMonth, "MM/yyyy", new Date(), {
  //     timeZone: "America/Sao_Paulo",
  //   });

  //   const compareMonths = compareAsc(formatFirstMonth, formatSecondMonth)

  //   return compareMonths
  // }
}

// -1: Indica que a primeira data é anterior à segunda data.
// 0: Indica que as duas datas são iguais.
// 1: Indica que a primeira data é posterior à segunda data.
