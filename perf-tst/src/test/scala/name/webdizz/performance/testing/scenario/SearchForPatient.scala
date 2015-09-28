import io.gatling.core.Predef._
import io.gatling.core.scenario.Simulation
import io.gatling.http.Predef._

import scala.concurrent.duration._

class SearchForPatient extends Simulation {

  object Patient {

    val feeder = csv("patients.csv").random // default is queue, so for this test, we use random to avoid feeder starvation
  }

  val httpConf = http
    .baseURL("http://192.168.176.128:8080")
    .acceptHeader("application/json;q=0.9,*/*;q=0.8")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val users = scenario("Patients")
    .feed(Patient.feeder)
    .exec(http("Load patient ${patientId}")
      .get("/patients/${patientId}"))

  setUp(
    users.inject(rampUsers(10) over (10 seconds))
  ).protocols(httpConf)
}