import io.gatling.core.Predef._
import io.gatling.core.scenario.Simulation
import io.gatling.http.Predef._

import scala.concurrent.duration._

class PatientServiceLoadScenario extends Simulation {

  object Patient {
    // use data from csv file
    val patients = csv("patients.csv").random

    // load patient scenario
    val load = scenario("Patients")
      // use feed to generate random queries
      .feed(patients)
      .exec(
        http("Load patients")
          // use GET HTTP method
          .get("/patients/${patientId}")
          // check response
          .check(status.is(200))
          .check(jsonPath("$.insuranceHashedId").is("${patientId}"))
      ).pause(1 second)

    val create = scenario("Create patients")
      .feed(patients)
      .exec(
        http("Create patient")
          // use POST HTTP method
          .post("/patients/${patientId}")
          // add header to specify JSON request
          .header(HttpHeaderNames.ContentType, HttpHeaderValues.ApplicationJson)
          // encode JSON request
          .body(StringBody(
            """
              {
              "firstName":"${firstName}",
              "lastName":"${lastName}"
              }
            """)).asJSON
          .check(status.is(200))
      ).pause(2 second)
  }

  // configure common HTTP stack
  val httpConf = http
    .baseURL("http://192.168.176.128:8081")
    .acceptHeader("application/json;q=0.9,*/*;q=0.8")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  // set up load
  setUp(
    Patient.load.inject(
      rampUsers(50) over (2 minutes),
      heavisideUsers(100) over (20 seconds)
    ),
    Patient.create.inject(
      rampUsers(10) over (2 minutes),
      constantUsersPerSec(5) during (15 seconds)
    )
  )
    .maxDuration(10 minutes)
    .protocols(httpConf)
}
