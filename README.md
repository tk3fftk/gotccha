```
# setup kind
kind create cluster

# create secrets
kubectl create secret generic ana-secrets --from-literal=ANA_CUSNUM=<cusnum> --from-literal=ANA_PASSWORD=<password>

# test cronjob
kubectl create job --from=cronjob/gotccha test01

# teardown
kind delete cluster
```
